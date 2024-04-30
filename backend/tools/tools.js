const log = require('../tools/log');
try {
    const OTP = require('../modal/otp/otpModal');
    const { Item } = require('../modal/item/item');
    const { Seller } = require('../modal/seller/sellerModal');
    const { Order } = require('../modal/item/order');
    const bcrypt = require('bcrypt');
    const client = require("twilio")(process.env.ACCOUNTSIDTWL, process.env.AUTHTOKENTWL);
    const jwt = require('jsonwebtoken');
    const JWTKEYS = process.env.JWTKEYS;


    const encryptPassword = (async (password) => {   //Module for Encrypting Password
        const sltRound = 7;
        const hashedPassword = await bcrypt.hash(password, sltRound);
        return hashedPassword;
    });

    // function for return a random 6 digit 
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }
    const sendOtp = (async (req, res, msg) => {     //Module for Sending Otp
        return new Promise(async (resolve, reject) => {
            try {
                const mobileNumber = req.body.countryCode + req.body.mobile;
                let otp = generateOTP();
                await client.messages.create({
                    body: `${otp} is ${msg}`,
                    from: +15074282049,
                    to: mobileNumber
                }).then(() => {
                    resolve(otp)
                }).catch((error) => {
                    reject(error)
                });
            } catch (error) {
                log(error);
            }
        })
    });

    const verifyOtp = (async (countryCode, mobile, otp) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await OTP.findOne({ countryCode: countryCode, mobile: mobile, otp: otp });
                if (data !== null && data !== undefined) {
                    resolve(1);
                }
                else {
                    reject(0);
                }
            } catch (error) {
                log(error);
            }
        })
    })
    const jwtToken = (async (_id) => {
        return token = jwt.sign({ _id: _id }, JWTKEYS, { expiresIn: '20d' });
    })
    const generateOrderId = (async (seller, customer, item, rzrpOrderId, rzrpPaymentId) => {
        return new Promise(async (resolve, reject) => {
            try {
                const ORDER = new Order({
                    seller,
                    customer,
                    item
                })
                rzrpPaymentId && (
                    ORDER.payment.paymentId = rzrpPaymentId,
                    ORDER.payment.rzrpOrderId = rzrpOrderId,
                    ORDER.payment.status = 'paid'
                );
                const data = await ORDER.save();
                if (!data) {
                    reject(0);
                }
                else {
                    resolve(data._id);
                }
            } catch (error) {
                reject(0);
                log(error);
            }
        })
    })
    const placeOrder = (async (req, res) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { itemId, qty, contactNo, rzrpOrderId, rzrpPaymentId } = req.body;
                if (!itemId || !qty || !contactNo) {
                    reject({ message: "Please Provide All Details" });
                }
                await Item.findById(itemId).select('-photo -category -description -qty')
                    .then(async (product) => {
                        if (product) {
                            const sellerData = await Seller.findById(product.seller).select('_id address');
                            if (!sellerData) {
                                reject({ message: "Seller Data Not Found" });
                            }
                            const tPrice = product.price * qty;
                            const seller = {
                                id: sellerData._id,
                                pickupAddress: Object.assign({}, sellerData.address)
                            }
                            const customer = {
                                id: req.user._id,
                                name: req.user.name,
                                contactNo: contactNo,
                                deleveryAddress: Object.assign({}, req.user.address)
                            }
                            var item = {
                                id: product._id,
                                name: product.name,
                                model: product.model,
                                qty: qty,
                                rate: product.price,
                                deliveryCharge: 0,
                                totalAmount: tPrice
                            }
                            await generateOrderId(seller, customer, item, rzrpOrderId, rzrpPaymentId).then((result) => {
                                    resolve({ message: "COD Order Placed" });
                            }).catch((error) => {
                                reject({ message: "Some Intenal Error Occure While Generating OrderId", error: error });
                            })
                        }
                        else {
                            reject({ message: "Item Not Found" });
                        }
                    }).catch((error) => {
                        if (error.codeName) {
                            log(error);
                            reject({ message: "Some Error Occured While Fetching Item Details" });
                        }
                        else {
                            reject({ message: "Some Error Occured While Fetching Item Details" });
                        }
                    })
            } catch (error) {
                log(error);
                reject({ message: "We Are Facing Some Internal Problem!", error: error });
            }
        })
    })

    // exporting modules
    module.exports = {
        encryptPassword,
        sendOtp,
        verifyOtp,
        jwtToken,
        generateOrderId,
        placeOrder
    };
} catch (error) {
    log(error);
}