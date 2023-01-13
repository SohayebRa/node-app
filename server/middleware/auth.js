const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  console.log(authHeader);

  if (!authHeader) {
    const error = new Error("JWT");
    error.statusCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let checkToken;
  try {
    checkToken = jwt.verify(token, "MOTSECRET");
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  // Si es un token valido, pero hay algun error
  if (!checkToken) {
    const error = new Error("Non authentifié");
    error.statusCode = 401;
    throw error;
  }

  next();
};
