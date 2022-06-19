const { Order, Product, User, Shipment, Payment, Address, DetailOrder } = require("../models");

const uuid = require("uuid");
const Validator = require("fastest-validator");
const formValidator = new Validator();

const validationSchema = {
  paymentId: { type: "string" },
  shipmentId: { type: "string" },
  addressId: { type: "string" },
  detailorders: { type: "array", items: "object", min: 1 },
};

// findAll
exports.findAll = async (req, res, next) => {
  try {
    const { id: userId, role } = req.user;
    let criteria = {};

    if (role === "customer") {
      criteria = {
        where: {
          userId: userId,
        },
      };
    }

    const data = await Order.findAll({
      ...criteria,
      include: [
        "customer",
        "order_address",
        "payment_method",
        "shipment_method",
        {
          association: "detailorders",
          include: "product",
        },
      ],
    });

    if (!data) {
      throw new Error("Gagal mengambil data Products");
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
    const data = await Order.findByPk(id, {
      include: [
        "customer",
        "order_address",
        "payment_method",
        "shipment_method",
        {
          association: "detailorders",
          include: "product",
        },
      ],
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
    const { id: userId } = req.user;
    const { addressId, paymentId, shipmentId, status = "unpaid", buktiBayar = null, detailorders } = req.body;

    const validation = formValidator.validate(req.body, validationSchema);
    if (validation.length) {
      return res.status(400).json({
        status: false,
        error: validation,
      });
    }

    const data = await Order.create(
      {
        id: uuid.v4(),
        userId: userId,
        paymentId: paymentId,
        shipmentId: shipmentId,
        addressId: addressId,
        status: status,
        buktiBayar: buktiBayar,
        detailorders: detailorders.map((item) => {
          return {
            id: uuid.v4(),
            productId: item?.id,
            price: item?.price,
            quantity: item?.qty,
          };
        }),
      },
      {
        include: [
          {
            association: "detailorders",
          },
        ],
      }
    );

    if (!data) {
      throw new Error("Gagal memproses order pembelian");
    }

    // Kurangi jumlah stock
    // stock - quantity di setiap item
    // dan update data produk
    detailorders.forEach((item) => {
      Product.update(
        {
          stock: item?.stock - item?.quantity,
        },
        {
          where: { id: item?.id },
        }
      );
    });

    res.json(
      await Order.findByPk(data?.id, {
        include: [
          "customer",
          "order_address",
          "payment_method",
          "shipment_method",
          {
            association: "detailorders",
            include: "product",
          },
        ],
      })
    );
  } catch (error) {
    next(error);
  }
};

// Update status
exports.updateStatus = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const { status } = req.body;

    console.log(userId);

    const data = await Order.update(
      {
        status: status,
      },
      {
        where: { id: id },
      }
    );

    if (!data) {
      throw new Error("Gagal mengupdate status order");
    }

    return res.json(
      await Order.findByPk(id, {
        include: [
          "customer",
          "order_address",
          "payment_method",
          "shipment_method",
          {
            association: "detailorders",
            include: "product",
          },
        ],
      })
    );
  } catch (error) {
    next(error);
  }
};

// Upload bukti bayar
exports.uploadBuktiBayar = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const file = req.files.buktiBayar;

    if (!req.files) {
      throw new Error("Tidak ada bukti bayar yang di upload");
    }

    const fileName = uuid.v4() + file.name.split(" ").join(" ", "");
    file.mv(`./public/uploads/${fileName}`);
    await Order.update(
      {
        buktiBayar: fileName,
      },
      {
        where: { id: id, userId: userId },
      }
    );

    return res.json(
      await Order.findByPk(id, {
        include: [
          "customer",
          "order_address",
          "payment_method",
          "shipment_method",
          {
            association: "detailorders",
            include: "product",
          },
        ],
      })
    );
  } catch (error) {
    next(error);
  }
};
