import app from "./app.js"
import connectDB from "./config/mongo.js"
import "./config/redis.js"
import dotenv from "dotenv"

dotenv.config()
const PORT = 3000

await connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})