const jwt = require("jsonwebtoken");
const JWT_SECRET = "HaiderkisecretKey";
const fetchUsers = (req, res, next) => {
  // Get the users from the jwt token & add id req object
  const token = req.header("auth-Token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.users;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetchUsers;
