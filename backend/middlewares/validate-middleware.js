const validate = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = Schema.parse(req.body);
    req.body = parsedBody;
    next();
  } catch (error) {
    next({
      status: 400,
      message: error.errors,
    });
  }
};

module.exports = validate;