const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    foodName: String,
    restaurant: String,
    paymentMethod: String,
    account_id: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "accounts"
    }
});

const Order = mongoose.model("orders", orderSchema, "orders");

// CRUD

const getAll = async(account_id) => {
    return await Order.find({ account_id });
};

const getOne = async(account_id, id) => {
    return await Order.findOne({
        account_id: account_id,
        _id: id
    });
};

const create = async(data) => {
    const order = new Order(data);
    return await order.save();
};

const update = async(account_id, id, data) => {
    return await Order.updateOne(
        {
            _id: id,
            account_id: account_id
        },
        data
    );
};

const remove = async(account_id, id) => {
    return await Order.deleteOne({
        _id: id,
        account_id: account_id
    });
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};