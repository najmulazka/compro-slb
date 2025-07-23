module.exports = {
    jsonResponse: (req, res, next) => {
      res.sendResponse = (status, message, err = null, data = null) => {
        res.status(status).json({
          status: status < 400,
          message,
          err,
          data,
        });
      };
      next();
    },
  };