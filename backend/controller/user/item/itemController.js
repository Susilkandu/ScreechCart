const log = require('../../../tools/log');
try {
    const { Item } = require('../../../modal/item/item');
    const { Order } = require('../../../modal/item/order');
    const { placeOrder } = require('../../../tools/tools');
    const crypto = require('crypto');
    const Razorpay = require('razorpay');
    const keyId = process.env.KEYIDRZ;
    const sctKey = process.env.SECRETKEY;
    var instance = new Razorpay({ key_id: keyId, key_secret: sctKey });
    // module area
    const getItem = async (req, res) => {
        try {
            const { page } = req.body;
            const limit = 25;
            const offset = page ? (page - 1) * limit : 0;
            const items = await Item.find().limit(limit).skip(offset);
            return res.status(200).json(items);
        } catch (error) {
            if (error.codeName) {
                return res.status(400).json({ message: "Not Avaiable Data", ackbool: 0, error: error });
            }
            else {
                log(error);
                return res.status(500).json({ message: "Some Internal Error Occured", ackbool: 0, error: error });
            }
        }
    }
    const viewItemDetails = async (req, res) => {
        try {
            const { _id } = req.body;
            if (!_id) {
                return res.status(400).json({ message: "Please Provide item _id parameter", ackbool: 0 });
            }
            await Item.findById(_id).select("-seller -qty")
                .then((data) => {
                    if (data) {
                        return res.status(200).json({ details: data, ackbool: 1 });
                    }
                    return res.status(404).json({ message: "Item Not found", ackbool: 0 });
                }).catch((error) => {
                    if (error.codeName) {
                        log(error);
                    }
                    return res.status(400).json({ message: "Some Error Occured While Fetching Details", ackbool: 0, error: error });
                })
        } catch (error) {
            log(error);
            return res.status(404).json({ message: "Not Fetched Item Details", ackbool: 0, error: error });
        }
    }
    const placeCODOrder = async (req, res) => {
        try {
            placeOrder(req, res, null, null).then((message) => {
                return res.status(200).json({ message: message, ackbool: 1 });
            }).catch((error) => {
                return res.status(400).json({ message: error, ackbool: 0 });
            })
        } catch (error) {
            log(error);
        }
    }
    const initiatePayment = async (req, res) => {
        try {
            const { _id, qty } = req.body;
            if (!_id || !qty) {
                return res.status(200).send({ message: "Please Provide Item _id ", ackbool: 0 });
            }
            await Item.findById(_id).then(async (data) => {
                if (!data) {
                    return res.status(404).json({ message: "Item Id Incorrect", ackbool: 0 });
                }
                await instance.orders.create({
                    amount: data.price * qty * 100,
                    currency: "INR",
                    receipt: `${data.model} qty = ${qty} by ScreechCArt`,
                    notes: {
                        key_id: keyId,
                        user: req.user._id,
                        seller: data.seller,
                        itemId: _id,
                        qty: qty
                    }
                }).then((order) => {
                    return res.json(order)
                }).catch((error) => {
                    return res.status(400).json({ message: "Payment Failed", error: error });
                })
            }).catch((error) => {
                return res.status(500).json({ message: "Some Error Occured", error: error, ackbool: 0 });
            })
        } catch (error) {
            log(error);
            return res.status(500).json({ message: "Some Internal Error Occured", ackbool: 0, error: error })
        }
    }
    const verifyPaymentAndPlaceOrder = async (req, res) => {
        try {
            const { rzrpOrderId, rzrpPaymentId, razorpay_signature } = req.body;
            const sha = crypto.createHmac("sha256", sctKey);
            sha.update(`${rzrpOrderId}|${rzrpPaymentId}`);
            const digest = sha.digest("hex");
            if (digest !== razorpay_signature) {
                return res.json({ message: "Transaction Failure", ackbool: 0 });
            }
            else {
                placeOrder(req, res, rzrpPaymentId, rzrpOrderId).then((message) => {
                    return res.status(201).json({ message: message, rzrpOrderId, ackbool: 1 });
                }).catch((message) => {
                    return res.status(500).json({ message, ackbool: 0 });
                })
            }
        } catch (error) {
            log(error);
            return res.status(500).json({ message: "Some Internal Error Occured", ackbool: 0, error: true });
        }
    }
    const showMyOrder = async (req, res) => {
        try {
            await Order.find({ "customer.id": req.user._id }).select('item')
                .then((data) => {
                    if (!data || data.length <= 0) {
                        return res.status(400).json({ message: "Not Available", ackbool: 0 });
                    }
                    return res.status(200).json({ data, ackbool: 1 });
                }).catch((error) => {
                    return res.status(400).json({ message: "Some Error Occured", error: error, ackbool: 0 })
                })

        } catch (error) {
            log(error);
            return res.status(500).json({ message: "Some Internal Error Occured", error: error, ackbool: 0 });
        }
    }
    // module exporting 
    module.exports = {
        getItem,
        viewItemDetails,
        initiatePayment,
        placeCODOrder,
        verifyPaymentAndPlaceOrder,
        showMyOrder
    }

} catch (error) {
    log(error);
}