const prisma = require('../libs/prisma.libs');
const path = require('path');
const imagekit = require('../libs/imagekit.libs');

module.exports = {
  createAnnouncement: async (req, res, next) => {
    const { title, description } = req.body;
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

      const announcements = await prisma.announcements.create({
        data: {
          title,
          imageUrl: url,
          fileId,
          description,
          createdBy: Number(1),
        },
      });

      res.sendResponse(200, 'OK', null, announcements);
    } catch (err) {
      next(err);
    }
  },
};
