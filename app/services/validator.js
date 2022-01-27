const validator = {

  validateBody: (schema) => (req, res, next) => {
      const { error } = schema.validate(req.body);

      if (error) {
          res.status(400).json(error);
      } else {
          next();
      }
  },

  validateQuery: (schema) => (req, res, next) => {
      const { error } = schema.validate(req.query);

      if (error) {
          res.status(400).json(error);
      } else {
          next();
      }
  }
};

module.exports = validator;