const orders = require("../pkg/orders");

const getAll = async (req, res) => {
    try {
        const data = await orders.getAll(req.auth.id);
        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const getOne = async (req, res) => {
    try {
        const data = await orders.getOne(
            req.auth.id,
            req.params.id
        );

        return res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const create = async (req, res) => {
    try {
        const data = {
            ...req.body,
            account_id: req.auth.id
        };

        const result = await orders.create(data);

        return res.status(201).send(result);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const update = async (req, res) => {
    try {
        await orders.update(
            req.auth.id,
            req.params.id,
            req.body
        );

        return res.status(200).send("Order updated");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

const remove = async (req, res) => {
    try {
        await orders.remove(
            req.auth.id,
            req.params.id
        );

        return res.status(200).send("Order deleted");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};