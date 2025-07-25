const prisma = require('../libs/prisma.libs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

module.exports = {
  restrict: (req, res, next) => {
    let { authorization } = req.headers;
    if (!authorization) {
      return res.sendResponse(401, 'Unauthorized', 'Missing authorization in header', null);
    }

    jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.sendResponse(401, 'Unauthorized', err.message, null);
      }

      req.user = await prisma.admins.findUnique({ where: { username: decoded.username } });
      if (!req.user) {
        return res.sendResponse(400, 'Bad Request', 'Admin does not exist', null);
      }

      next();
    });
  },
};
