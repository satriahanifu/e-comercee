const { DetailOrder } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const { ValidationError } = require("sequelize");

const formValidator = new Validator();

const validationSchema = {
  orderId: { type: "string" },
  productId: { type: "string" },
  price: { type: "double" },
  quantity: { type: "integer" },
};

//findAll
exports.findAll = async (req, res, next) => {
  try {
    const data = await DetailOrder.findAll();

    if (!data) {
      throw new Error("Gagal mengambil data detail pemesanan");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DetailOrder.findByPk(id, {
      include: "DetailOrder",
    });

    if (!data) {
      throw new Error("gagal mengambil data dengan id: " + id);
    }
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { orderId, productId, price, quantity } = req.body;

    const validation = formValidator.validate(req.body, validationSchema);
    if (ValidationError.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }
    const data = await DetailOrder.create({
      id: uuid.v4(),
      orderId: orderId,
      productId: productId,
      price: price,
      quantity: quantity,
    });
    if (!data) {
      throw new Error("gagal menambahkan detail pemesanan");
    }
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { orderId, productId, price, quantity } = req.body;
    const { id } = req.params;

    const data = await DetailOrder.update(
      {
        orderId: orderId,
        productId: productId,
        price: price,
        quantity: quantity,
      },
      { where: { id: id } }
    );
    if (!data) {
      throw new Error("gagal mempebarui data dengan id " + id);
    }
    res.json(await DetailOrder.findByPk(id));
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await DetailOrder.destroy({
      where: {
        id: id,
      },
    });

    if (!data) {
      throw new Error("gagal menghapus data dengan id: " + id);
    }
    res.json({
      status: true,
    });
  } catch (err) {
    next(err);
  }
};
