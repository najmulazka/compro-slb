const prisma = require('../libs/prisma.libs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  createAdmin: async (req, res, next) => {
    try {
      const { name, username, password } = req.body;

      let adminExist = await prisma.admins.findUnique({ where: { username } });
      if (adminExist) {
        return res.status(400).json({
          status: false,
          message: 'Bad Request',
          err: 'username has already been used!',
          data: null,
        });
      }

      let encryptedPassword = await bcrypt.hash(password, 10);
      let admin = await prisma.admins.create({
        data: {
          name,
          username,
          password: encryptedPassword,
        },
      });

      return res.status(201).json({
        status: true,
        message: 'Created',
        err: null,
        data: { admin },
      });
    } catch (err) {
      next(err);
    }
  },
  loginAdmin: async (req, res, next) => {
    try {
      let { username, password } = req.body;

      const existAdmin = await prisma.admins.findUnique({ where: { username } });

      if (!existAdmin) {
        return res.sendResponse(400, 'Bad Request', 'Usernamee or password does not exist', null);
      }

      const isPasswordCorrect = await bcrypt.compare(password, existAdmin.password);
      if (!isPasswordCorrect) {
        return res.sendResponse(400, 'Bad Request', 'Username or passwordd does not exist', null);
      }

      let token = await jwt.sign({ username: existAdmin.username }, JWT_SECRET_KEY);
      res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: { existAdmin, token },
      });
    } catch (err) {
      next(err);
    }
  },

  whoami: async (req, res, next) => {
    try {
      res.status(200).json({
        status: true,
        message: 'OK',
        err: null,
        data: { user: req.user },
      });
    } catch (err) {
      next(err);
    }
  },
};
