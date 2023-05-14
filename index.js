const express = require("express")
const mongoose = require("mongoose")

const authRouter = require("./routes/auth.routes")
const app = express()
const PORT = process.env.PORT || 4000
const corsMiddleware = require('./middleware/cors.middleware')

app.use(corsMiddleware)
app.use(express.json())
app.use("/api/auth", authRouter)


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://saglushevich5:17812674202@cluster0.hmdejip.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()