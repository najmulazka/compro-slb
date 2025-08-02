const prisma = require('../libs/prisma.libs');
const path = require('path');
const imagekit = require('../libs/imagekit.libs');

module.exports = {
  createdDocumentation: async (req, res, next) => {
    const { title, description, date } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let dateSplit = date.split('/');

      const documentation = await prisma.documentations.create({
        data: {
          title,
          imageUrl: url,
          fileId,
          description,
          semester: `${dateSplit[1]}-${dateSplit[0]}`,
          createdAt: new Date(date),
          createdBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, 'OK', null, documentation);
    } catch (err) {
      next(err);
    }
  },

  getDocumentations: async (req, res, next) => {
    try {
      const { semester } = req.query;
      let documentations;

      if (!semester) {
        documentations = await prisma.documentations.groupBy({
          by: ['semester'],
          _count: true,
          orderBy: {
            semester: 'desc',
          },
        });
      } else {
        documentations = await prisma.documentations.findMany({
          where: {
            semester,
          },
        });
      }

      res.sendResponse(200, 'OK', null, documentations);
    } catch (err) {
      next(err);
    }
  },

  getDocumentation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const documentation = await prisma.documentations.findUnique({ where: { id: Number(id) } });

      if (!documentation) {
        return res.sendResponse(404, 'Not Found', 'Resource not found', null);
      }

      res.sendResponse(200, 'OK', null, documentation);
    } catch (err) {
      next(err);
    }
  },

  updateDocumentation: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, date } = req.body;
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'File is required',
          data: null,
        });
      }

      let strFile = req.file.buffer.toString('base64');
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const documentationExist = await prisma.documentations.findUnique({ where: { id: Number(id) } });
      if (!documentationExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      try {
        await imagekit.deleteFile(documentationExist.fileId);
      } catch (error) {
        console.warn('Failed to delete old file from ImageKit:', error?.message || error);
      }

      let dateSplit = date.split('/');
      const documentation = await prisma.documentations.update({
        where: { id: Number(id) },
        data: {
          title: title ?? documentationExist.title,
          imageUrl: url,
          fileId,
          description: description ?? documentationExist.description,
          semester: `${dateSplit[1]}-${dateSplit[0]}`,
          createdAt: new Date(date),
          updatedBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, 'OK', null, documentation);
    } catch (err) {
      next(err);
    }
  },

  deleteDocumentation: async (req, res, next) => {
    try {
      const { id } = req.params;

      const documentationExist = await prisma.documentations.findUnique({ where: { id: Number(id) } });
      if (!documentationExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      try {
        await imagekit.deleteFile(documentationExist.fileId);
      } catch (error) {
        console.warn('Failed to delete old file from ImageKit:', error?.message || error);
      }

      const documentation = await prisma.documentations.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, 'OK', null, documentation);
    } catch (err) {
      next(err);
    }
  },
};
