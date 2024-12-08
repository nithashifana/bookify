const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log(token);
    return res.status(401).json({ message: "No token provided. Access denied." });
  }

  
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    console.log("Decoded Token", decoded);
    req.user = { _id: decoded.id, ...decoded }; // Map `id` to `_id`
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(403).json({ message: "Invalid token. Access denied." });
  }
};

module.exports = authMiddleware;