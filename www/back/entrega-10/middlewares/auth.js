require("dotenv").config();
const jwt = require("jsonwebtoken");

function userAuthenticated(request, response, next) {
  try {
    // Get authorization header
    const { authorization } = request.headers;

    // Check if token is valid
    const decoded = jwt.verify(authorization, process.env.SECRET);

    // Add token payload to request
    request.auth = decoded;

    // Continue
    next();
  } catch (error) {
    const authError = new Error("Invalid authorization token");
    authError.httpCode = 401;
    next(authError);
  }
}

function userIsAdmin(request, response, next) {
  // Check if the user is admin in req.auth (see before) and send error if not
  if (!request.auth || request.auth.role !== "admin") {
    const error = new Error(
      "You do not have admin privileges to access this resource"
    );
    error.httpCode = 401;
    return next(error);
  }

  // Continue to the next middleware
  next();
}

module.exports = {
  userAuthenticated,
  userIsAdmin,
};
