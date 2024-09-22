const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    businessName: String,
    websiteUrl: String,
    country: String,
    city: String,
    fullName: String,
    phone: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;