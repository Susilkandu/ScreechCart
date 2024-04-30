const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    trim: true
  },
  address: {
    shopName: String,
    pinCode: Number,
    vill: String,
    city: String,
    district: String,
    state: String,
    country: String,
    location: {
      latitude: String,
      longitude: String
    }
  },
  mobile: {
    countryCode: { type: String, required: true },
    number: { type: Number, required: true, unique: true },
  },
  profilePhoto: {
    type: String,
    trim: true
  },
  password: {
    type: String
  }
});

const Seller = mongoose.model('Seller', sellerSchema);


module.exports = {
  Seller,
}