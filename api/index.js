import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())

app.use(cors())

const PORT = 3000; //port in which your application is running

// import and use the routers
import productRouter from "./route.product.js"

app.use("/api/products", productRouter)

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})