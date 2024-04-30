const log = require('../../tools/log');
try {
    const mongoose = require('mongoose');
    const orderSchema = new mongoose.Schema({
        seller: {
            id: String,
            pickupAddress: {
                shopName: String,
                pinCode: Number,
                vill: String,
                city: String,
                district: String,
                state: String,
                country: String,
                location: {
                    latitude: Number,
                    longitude: Number
                }
            }
        },
        customer: {
            id: String,
            name: String,
            contactNo: Number,
            deleveryAddress: {
                pinCode: Number,
                vill: String,
                city: String,
                district: String,
                state: String,
                country: String,
                landMark: String
            }
        },
        item: {
            id: String,
            name: String,
            model: String,
            qty: Number,
            rate: Number,
            deliveryCharge: Number,
            totalAmount: Number
        },
        payment: {
            status: {
                type: String,
                enum: ['paid', 'unpaid'],
                default: 'unpaid'
            },
            paymentId: String,
            rzrpOrderId: String
        },
        status: {
            type: String,
            enum: ['ongoing', 'delivered', 'return'],
            default:"ongoing"
        },
        resonOfReturn: String
    }
        , { timestamps: true });
    const Order = mongoose.model('Order', orderSchema);

    // Exporting Module
    module.exports = { Order }
} catch (error) {
    log(error);
}