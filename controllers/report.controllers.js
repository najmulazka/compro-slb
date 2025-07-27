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

      const report = await prisma.reports.create({
        data: {
          title,
          fileUrl: url,
          fileId,
          description,
          fundingSource,
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
      const reports = await prisma.$queryRaw`
        SELECT
          EXTRACT(YEAR FROM "createdAt") AS year,
          json_agg(a.* ORDER BY "createdAt") AS data
        FROM
          "Reports" a
        GROUP BY
          year
        ORDER BY
          year;
      `;

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

      const report = await prisma.reports.update({
        where: { id: Number(id) },
        data: {
          title: title ?? reportExist.title,
          fileUrl: url,
          fileId,
          createdAt: new Date(date),
          fundingSource,
          description: description ?? reportExist.description,
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
