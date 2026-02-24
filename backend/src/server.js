import app from "./app.js"
import connectDB from "./config/mongo.js"
import "./config/redis.js"

const PORT = 3000|| process.env.PORT

await connectDB();


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})