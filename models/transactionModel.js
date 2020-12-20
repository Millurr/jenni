const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    items: { type: Array, required: true},
    transactionId: {type: String, required: true},
    count: { type: Number, required: true },
    total: { type: Number, require: true},
    username: { type: String, required: true},
    name: { type: String, required:true},
    status: { type: String, required: true},
    tracking: {type: String, required: false},
    address: { type: String, required:true},
    userId: {type: String, required:true}
}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;