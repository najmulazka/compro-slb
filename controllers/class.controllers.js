const prisma = require('../libs/prisma.libs');
const path = require('path');
const imagekit = require('../libs/imagekit.libs');
const { get } = require('http');

module.exports = {
  createClass: async (req, res, next) => {
    const { level, gender, amout } = req.body;
    try {
      const classes = await prisma.class.create({
        data: {
          level,
          gender,
          amout,
        },
      });

      res.sendResponse(200, 'OK', null, classes);
    } catch (err) {
      next(err);
    }
  },

  getclass: async (req, res, next) => {
    try {
      const classes = await prisma.class.findMany();

      res.sendResponse(200, 'OK', null, classes);
    } catch (err) {
      next(err);
    }
  },

  updateClass: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { level, gender, amount } = req.body;

      const classExist = await prisma.class.findUnique({
        where: { id: Number(id) },
      });
      if (!classExist) {
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      const classes = await prisma.class.update({
        where: { id: Number(id) },
        data: {
          level: level ?? classExist.title,
          gender: gender ?? classExist.gender,
          amount: amount ?? classExist.amount,
          createdAt: new Date(date),
          updatedBy: Number(req.user.id),
        },
      });

      res.sendResponse(200, 'OK', null, classes);
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
        return res.sendResponse(404, 'Not Found', 'Resource Not Found', null);
      }

      const classes = await prisma.class.delete({
        where: { id: Number(id) },
      });

      res.sendResponse(200, 'OK', null, classes);
    } catch (err) {
      next(err);
    }
  },
};
