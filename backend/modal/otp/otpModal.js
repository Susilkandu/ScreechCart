const log = require('../../tools/log');
try {
    const mongoose = require('mongoose');
    const otpSchema = new mongoose.Schema({
        countryCode: { type: String },
        mobile: { type: Number, required: true, unique: true },
        otp: { type: Number, required: true },
        createdAt: { type: Date, default: Date.now }
    },{timestamps:true});
    const Otp = new mongoose.model('otp', otpSchema)
    module.exports = Otp;
} catch (error) {
    log(log);
}