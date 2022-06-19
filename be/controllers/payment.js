const { Payment } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  bankName: { type: "string" },
  accountNumber: { type: "string" },
  accountName: { type: "string" },
};

// findAll
exports.findAll = async (req, res, next) => {
  try {
    const data = await Payment.findAll();

    if (!data) {
      throw new Error("Gagal mengambil data payment");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};

// findOne
exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Payment.findByPk(id);

    if (!data) {
      throw new Error("Gagal mengambil data dengan id " + id);
    }

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
// create
exports.create = async (req, res, next) => {
  try {
    const { bankName, accountName, accountNumber } = req.body;

    const validation = formValidator.validate(req.body, validationSchema);
    if (validation.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }

    const data = await Payment.create({
      id: uuid.v4(),
      bankName,
      accountName,
      accountNumber,
    });

    if (!data) {
      throw new Error("Gagal menambahkan data");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
};
// update
exports.update = async (req, res, next) => {
  try {
    const { bankName, accountName, accountNumber } = req.body;
    const { id } = req.params;

    const data = await Payment.update(
      {
        bankName: bankName,
        accountName: accountName,
        accountNumber: accountNumber,
      },
      {
        where: { id: id },
      }
    );

    if (!data) {
      throw new Error("Gagal melakukan update data dengan id " + id);
    }

    res.json(await Payment.findByPk(id));
  } catch (error) {
    next(error);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Payment.destroy({
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
