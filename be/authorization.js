require("dotenv").config();
const { User } = require("./models");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const auth = req.header("Authorization");

    if (!auth) {
      throw new Error("Unauthorized");
    }

    const token = auth.split("Bearer ")[1];

    if (!token) {
      throw new Error("unauthorized");
    }

    const verifyToken = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(verifyToken?.user?.id);

    if (!user) {
      throw new Error("unauthorized");
    }
    req.user = user.get({ plain: true });
    return next();
  } catch (err) {
    return res.status(401).json({
      error: err.message,
    });
  }
};
