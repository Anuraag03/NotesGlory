const validate = (Schema) => async (req, res, next) => {
  try {
    const parsedBody = Schema.parse(req.body); // Validate the request body
    req.body = parsedBody; // Overwrite the request body with the parsed data
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({
      message: "Validation Failed",
      errors: error.errors, // Detailed errors from Zod
    });
  }
};

module.exports = validate;