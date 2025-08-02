const prisma = require('../libs/prisma.libs');
const path = require('path');
const imagekit = require('../libs/imagekit.libs');

module.exports = {
  createReport: async (req, res, next) => {
    const { title, description, date, fundingSource } = req.body;
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
      const report = await prisma.reports.create({
        data: {
          title,
          fileUrl: url,
          fileId,
          description,
          fundingSource,
          semester: dateSplit[0],
          createdAt: new Date(date),
          createdBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, 'OK', null, report);
    } catch (err) {
      next(err);
    }
  },

  getReports: async (req, res, next) => {
    try {
      const { semester } = req.query;
      let reports;
      if (!semester) {
        reports = await prisma.reports.groupBy({
          by: ['semester'],
          _count: true,
          orderBy: {
            semester: 'desc',
          },
        });
      } else {
        reports = await prisma.reports.findMany({
          where: {
            semester,
          },
        });
      }

      res.sendResponse(200, 'OK', null, reports);
    } catch (err) {
      next(err);
    }
  },

  getReport: async (req, res, next) => {
    try {
      const { id } = req.params;
      const report = await prisma.reports.findUnique({ where: { id: Number(id) } });

      if (!report) {
        return res.sendResponse(404, 'Not Found', 'Resource not found', null);
      }

      res.sendResponse(200, 'OK', null, report);
    } catch (err) {
      next(err);
    }
  },

  updateReport: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description, date, fundingSource } = req.body;
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

      const reportExist = await prisma.reports.findUnique({ where: { id: Number(id) } });
      if (!reportExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      try {
        await imagekit.deleteFile(reportExist.fileId);
      } catch (error) {
        console.warn('Failed to delete old file from ImageKit:', error?.message || error);
      }

      let dateSplit = date.split('/');

      const report = await prisma.reports.update({
        where: { id: Number(id) },
        data: {
          title: title ?? reportExist.title,
          fileUrl: url,
          fileId,
          createdAt: new Date(date),
          fundingSource: fundingSource ?? reportExist.fundingSource,
          description: description ?? reportExist.description,
          semester: dateSplit[0] ?? reportExist.dateSplit,
          updatedBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, 'OK', null, report);
    } catch (err) {
      next(err);
    }
  },

  deleteReport: async (req, res, next) => {
    try {
      const { id } = req.params;

      const reportExist = await prisma.reports.findUnique({ where: { id: Number(id) } });
      if (!reportExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      try {
        await imagekit.deleteFile(reportExist.fileId);
      } catch (error) {
        console.warn('Failed to delete old file from ImageKit:', error?.message || error);
      }

      const report = await prisma.reports.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, 'OK', null, report);
    } catch (err) {
      next(err);
    }
  },
};
