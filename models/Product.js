const {Schema, model, ObjectId} = require("mongoose")

const Product = new Schema({
    title: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: String, required: true},
    description: {type: String},
    gallery: {type: Array}
})


module.exports = model('Product', Product)