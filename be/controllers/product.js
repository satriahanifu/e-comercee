const { Product } = require("../models");
const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  name: { type: "string" },
  description: { type: "string" },
  price: { type: "number" },
  stock: { type: "number" },
  size: { type: "string" },
  image: { type: "string" },
  categoryId: { type: "string" },
};

// findAll
exports.findAll = async (req, res, next) => {
  try {
    const data = await Product.findAll({
      include: "category",
    });

    if (!data) {
      throw new Error("Gagal mengambil data Product");
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
    const data = await Product.findByPk(id, {
      include: "category",
    });

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
    const { name, description, price, stock, size, image, categoryId } =
      req.body;

    const validation = formValidator.validate(req.body, validationSchema);
    if (validation.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }

    const data = await Product.create({
      id: uuid.v4(),
      name: name,
      description: description,
      price: Number(price),
      stock: Number(stock),
      size: size,
      image: image,
      categoryId: categoryId,
    });

    if (!data) {
      throw new Error("Gagal menambahkan data");
    }

    const getInsertedData = await Product.findByPk(data?.id, {
      include: "category",
    });

    res.json(getInsertedData);
  } catch (error) {
    next(error);
  }
};
// update
exports.update = async (req, res, next) => {
  try {
    const { name, description, price, stock, size, image, categoryId } =
      req.body;
    const { id } = req.params;

    const data = await Product.update(
      {
        name: name,
        description,
        price,
        stock,
        size,
        image,
        categoryId,
      },
      {
        where: { id: id },
      }
    );

    if (!data) {
      throw new Error("Gagal melakukan update data dengan id " + id);
    }

    res.json(await Product.findByPk(id, { include: "category" }));
  } catch (error) {
    next(error);
  }
};

// delete
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await Product.destroy({
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
