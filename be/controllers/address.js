const { Address } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  title: { type: "string" },
  address: { type: "string" },
  primary: { type: "boolean" },
  userId: { type: "string" },
};

exports.findAll = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const data = await Address.findAll({
      where: {
        userId: userId,
      },
    });

    if (!data) {
      throw new Error("gagal mengambil data alamat");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const data = await Address.findOne(
      {
        where: {
          id: id,
          userId: userId,
        },
      },
      {
        include: "user",
      }
    );

    if (!data) {
      throw new Error("gagal mengambil id " + id);
    }
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { title, address, primary } = req.body;

    const Validation = formValidator.validate(req.body, validationSchema);
    if (validationSchema.length) {
      return res.status(400).json({
        status: false,
        error: Validation,
      });
    }

    // Update data alamat
    // jika primary yang diterima true
    // maka update alamat lain primary menjadi false
    // karena hanya boleh ada 1 primary alamat
    if (primary) {
      await Address.findAll({
        where: {
          primary: true,
        },
      }).then((result) => {
        result.forEach((item) => {
          item.set({ primary: false });
          item.save();
        });
      });
    }

    const data = await Address.create({
      id: uuid.v4(),
      title: title,
      address: address,
      primary: primary,
      userId: userId,
    });

    if (!data) {
      throw new Error("gagal menambahkan data ");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { title, address, primary } = req.body;
    const { id } = req.params;

    // Update data alamat
    // jika primary yang diterima true
    // maka update alamat lain primary menjadi false
    // karena hanya boleh ada 1 primary alamat
    if (primary) {
      Address.findAll({
        where: {
          primary: true,
        },
      }).then((result) => {
        result.forEach((item) => {
          item.set({ primary: false });
          item.save();
        });
      });
    }

    const data = await Address.update(
      {
        title: title,
        address: address,
        primary: primary,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!data) {
      throw new Error("gagal memperbarui data dengan id" + id);
    }
    res.json(await Address.findByPk(id));
  } catch (err) {
    next(err);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Address.destroy({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new Error("Gagal menghapus data dengan id " + id);
    }

    res.json({
      status: true,
    });
  } catch (error) {
    next(error);
  }
};
