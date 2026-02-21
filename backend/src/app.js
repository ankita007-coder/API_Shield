import express from "express"
import testRoutes from "./routes/test.routes.js"
import rateLimiter from "./middleware/rateLimiter.js"

const app = express()

app.use(express.json())
app.use(rateLimiter)
app.use("/api",testRoutes)

export default app