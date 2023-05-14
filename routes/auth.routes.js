const Router = require("express");
const User = require('../models/User')
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs")
const router = new Router()

//РЕГИСТРАЦИЯ
router.post('/registration', async (req, res) => {
    try {
        const {email, password} = req.body;

        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: `User with name ${email} already exist`})
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const user = new User({email, password: hashPassword})
        await user.save()
        return res.status(200).json({
            message: 'User was created',
            data: user
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

//АВТОРИЗАЦИЯ
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({message: "User not found"})
        }
        const isPassValid = bcrypt.compareSync(password, user.password)
        if (!isPassValid) {
            return res.status(400).json({message: "Invalid password"})
        }

        return res.json({
            user
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/add', async (req, res) => {
    try {
        const {title, brand, category, price, description, gallery} = req.body
        const candidate = await Product.findOne({title})
        if (candidate) {
            return res.status(404).json({message: "Already added"})
        }

        const product = new Product({title, brand, category, price, description, gallery})
        await product.save()

        return res.status(200).json({
            message: 'Product was added',
            data: product
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})

router.post('/makeOrder', async (req, res) => {
    try {
        const order = new Order(req.body)
        await order.save()

        return res.status(200).json({
            message: 'Order has been added',
            data: order
        })
    } catch (e) {
        console.log(e)
        res.send({message: "Server error"})
    }
})


router.get('/catalog', async (req, res) => {
    try {
        const products = await Product.find();
        return res.json({products: products})
    } catch (error) {
        res.send({message: "Server error"})
    }
})


router.get('/catalog/:category', async (req, res) => {
    const { category } = req.params
    try {
        const products = await Product.find({ category });
        return res.json({products: products})
    } catch (error) {
        res.send({message: "Server error"})
    }
})
    
router.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find();
        return res.json({orders: orders})
    } catch (error) {
        res.send({message: "Server error"})
    }
})

router.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findOne({ _id: id});
        return res.json({product})
    } catch (error) {
        res.send({message: "Server error"})
    }
})

router.put('/updateOrder/:_id', async (req, res) => {
    try {
        const {_id} = req.params;
        const {changes} = req.body;
        const order = await Order.findByIdAndUpdate({_id}, changes, {returnDocument: "after"})
        await order.save();
    } catch (error) {
        res.send({message: "Server error"})
    }
})

router.delete('/deleteOrder/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const order = await Order.findOneAndDelete({ _id: id});
        await order.save()

        return res.status(200);
    } catch (error) {
        res.send({message: "Server error"})
    }
})

router.delete('/deleteProduct/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const product = await Product.findOneAndDelete({ _id: id});
        await product.save()

        return res.status(200);
    } catch (error) {
        res.send({message: "Server error"})
    }
})

//ПОЛУЧЕНИЕ ДАННЫХ ОБ ПОЛЬЗОВАТЕЛЕ ИЗ БД
// router.get('/user/:_id', async (req, res) => {
//     try {
//         const {_id} = req.params;
//         const user = await User.findOne({_id})

//         return res.json({user})
//     } catch (error) {
//         res.send({message: "Server error"})
//     }
// })

module.exports = router