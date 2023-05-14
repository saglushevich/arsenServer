const {Schema, model} = require("mongoose")

const Order = new Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    region: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    request: {type: String},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    products: {type: String, required: true},
    status: {type: String, default: "не обработан"}
})


module.exports = model('Order', Order)