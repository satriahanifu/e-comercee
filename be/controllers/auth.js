require("dotenv").config();
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  try {
    const { username, password, fullname, email, role } = req.body;

    const existCheck = await User.findOne({
      where: { username }, //kenapa ada yg pakai obj dan ada yg pakai array?
    });

    if (existCheck) {
      throw new Error(`User ${username} sudah digunakan`);
    }

    const data = await User.create({
      id: uuid.v4(),
      username: username,
      password: bcrypt.hashSync(password, 12),
      fullname: fullname,
      email: email,
      role: role,
    });

    if (!data) {
      throw new Error("gagal registrasi user baru");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const existCheck = await User.findOne({
      where: { username },
    });

    if (!existCheck) {
      throw new Error(`user ${username} tidak terdaftar`);
    }

    const pwdCheck = await bcrypt.compare(password, existCheck.password);

    if (!pwdCheck) {
      throw new Error("error!, password salah");
    }

    const accessToken = jwt.sign(
      {
        user: existCheck,
      },
      JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(201).json({
      status: true,
      data: {
        token: accessToken,
        user: existCheck,
      },
    });
  } catch (err) {
    next(err);
  }
};
