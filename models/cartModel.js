const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    itemId: {type: String, required: true},
    userId: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    count: {type: Number, required: true},
    price: {type: Number, required: true}
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;