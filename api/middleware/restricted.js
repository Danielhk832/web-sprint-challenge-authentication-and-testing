const { JWT_SECRET } = require("../secrets/index");
const jwt = require("jsonwebtoken");

/*
    IMPLEMENT

    1- On valid token in the Authorization header, call next.

    2- On missing token in the Authorization header,
      the response body should include a string exactly as follows: "token required".

    3- On invalid or expired token in the Authorization header,
      the response body should include a string exactly as follows: "token invalid".
  */

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const formattedToken = token ? token.replace("Bearer", "").trim() : null;
  if (!formattedToken) {
    return next({ status: 401, message: "token required" });
  }

  // if (!token) {
  //   return next({ status: 401, message: "token required" });
  // }
  jwt.verify(formattedToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return next({ status: 401, message: "token invalid" });
    }
    req.decodedJwt = decoded;
    next();
  });
};
