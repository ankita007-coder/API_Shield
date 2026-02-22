import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const authMidddleware = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!authHeader) {
    return next();
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
  } catch (err) {
    console.error("Invalid token");
  }

  next();
};
