const prisma = require("../libs/prisma.libs");
const path = require("path");
const imagekit = require("../libs/imagekit.libs");

module.exports = {
  createAnnouncement: async (req, res, next) => {
    const { title, description } = req.body;
    try {
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "File is required",
          data: null,
        });
      }

      let strFile = req.file.buffer.toString("base64");
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let date = new Date();
      let semester;
      if (date.toISOString().split("-")[1] <= 6) {
        semester = `1-${date.toISOString().split("-")[0]}`;
      } else {
        semester = `2-${date.toISOString().split("-")[0]}`;
      }

      const announcements = await prisma.announcements.create({
        data: {
          title,
          imageUrl: url,
          fileId,
          description,
          semester,
          createdBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, "OK", null, announcements);
    } catch (err) {
      next(err);
    }
  },

  getAnnouncements: async (req, res, next) => {
    try {
      const { semester } = req.query;
      let announcements;
      if (!semester) {
        announcements = await prisma.announcements.groupBy({
          by: ["semester"],
          _count: true,
          orderBy: { semester: "desc" },
        });
        announcements.sort((a, b) => {
          const [semA, yearA] = a.semester.split("-").map(Number);
          const [semB, yearB] = b.semester.split("-").map(Number);

          if (yearA !== yearB) return yearB - yearA; // Descending year
          return semB - semA; // Descending semester (2 dulu baru 1)
        });
      } else {
        announcements = await prisma.announcements.findMany({
          where: { semester },
          orderBy: { createdAt: "desc" },
        });
      }

      res.sendResponse(200, "OK", null, announcements);
    } catch (err) {
      next(err);
    }
  },

  getAnnouncement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const announcement = await prisma.announcements.findUnique({
        where: { id: Number(id) },
      });

      if (!announcement) {
        return res.sendResponse(404, "Not Found", "Resource not found", null);
      }

      res.sendResponse(200, "OK", null, announcement);
    } catch (err) {
      next(err);
    }
  },

  getAllAnnouncements: async (req, res, next) => {
    const { limit } = req.query;
    let finalLimit = parseInt(limit) || 10;
    try {
      const announcements = await prisma.announcements.findMany({
        orderBy: { createdAt: "desc" },
        take: finalLimit,
        include: {
          admin: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
          updatedAdmin: {
            select: {
              id: true,
              name: true,
              username: true,
            },
          },
        },
      });

      res.sendResponse(200, "OK", null, announcements);
    } catch (err) {
      next(err);
    }
  },

  updateAnnouncement: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      if (!req.file) {
        return res.status(400).json({
          status: false,
          message: "Bad Request",
          err: "File is required",
          data: null,
        });
      }

      let strFile = req.file.buffer.toString("base64");
      const { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      const announcementExist = await prisma.announcements.findUnique({
        where: { id: Number(id) },
      });
      if (!announcementExist) {
        return res.sendResponse(404, "Not Found", "Resource Not Found", null);
      }

      try {
        await imagekit.deleteFile(announcementExist.fileId);
      } catch (error) {
        console.warn(
          "Failed to delete old file from ImageKit:",
          error?.message || error
        );
      }

      const announcement = await prisma.announcements.update({
        where: { id: Number(id) },
        data: {
          title: title ?? announcementExist.title,
          imageUrl: url,
          fileId,
          description: description ?? announcementExist.description,
          updatedBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, "OK", null, announcement);
    } catch (err) {
      next(err);
    }
  },

  deleteAnnouncement: async (req, res, next) => {
    try {
      const { id } = req.params;

      const announcementExist = await prisma.announcements.findUnique({
        where: { id: Number(id) },
      });
      if (!announcementExist) {
        return res.sendResponse(404, "Not Found", "Resource Not Found", null);
      }

      try {
        await imagekit.deleteFile(announcementExist.fileId);
      } catch (error) {
        console.warn(
          "Failed to delete old file from ImageKit:",
          error?.message || error
        );
      }

      const announcement = await prisma.announcements.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, "OK", null, announcement);
    } catch (err) {
      next(err);
    }
  },
};
