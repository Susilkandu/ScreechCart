const log = require('../../tools/log');
const mongoose = require('mongoose');
try {
    
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    mobile: {
        countryCode: {type: String, required: true},
        number: { type: Number, required: true, unique: true},
    },
    email: {
        type: String, 
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String
    },
    address: {
        pinCode: { type: Number },
        vill: { type: String },
        city: { type: String },
        district: { type: String },
        state: { type: String },
        country: { type: String },
        landMark: { type: String },
    }
});
const User = mongoose.model('User', userSchema);
module.exports = {
    User,
}

} catch (error) {
    log(error);
}