const prisma = require("../libs/prisma.libs");
const path = require("path");
const imagekit = require("../libs/imagekit.libs");
const { get } = require("http");

module.exports = {
  createClass: async (req, res, next) => {
    const { level, male, female } = req.body;
    try {
      const classes = await prisma.class.create({
        data: {
          level,
          male,
          female,
          createdBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, "OK", null, classes);
    } catch (err) {
      next(err);
    }
  },

  getClassById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const classes = await prisma.class.findUnique({
        where: { id: Number(id) },
      });

      res.sendResponse(200, "OK", null, classes);
    } catch (err) {
      next(err);
    }
  },

  getclass: async (req, res, next) => {
    try {
      const classes = await prisma.class.findMany();

      res.sendResponse(200, "OK", null, classes);
    } catch (err) {
      next(err);
    }
  },

  updateClass: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { level, male, female } = req.body;

      const classExist = await prisma.class.findUnique({
        where: { id: Number(id) },
      });
      if (!classExist) {
        return res.sendResponse(404, "Not Found", "Resource Not Found", null);
      }

      const classes = await prisma.class.update({
        where: { id: Number(id) },
        data: {
          level: level ?? classExist.title,
          male: male ?? classExist.title,
          female: female ?? classExist.title,
          updatedBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, "OK", null, classes);
    } catch (err) {
      next(err);
    }
  },

  deleteClass: async (req, res, next) => {
    try {
      const { id } = req.params;

      const classExist = await prisma.class.findUnique({
        where: { id: Number(id) },
      });
      if (!classExist) {
        return res.sendResponse(404, "Not Found", "Resource Not Found", null);
      }

      const classes = await prisma.class.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, "OK", null, classes);
    } catch (err) {
      next(err);
    }
  },
};
