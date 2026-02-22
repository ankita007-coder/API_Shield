import express from "express"
import testRoutes from "./routes/test.routes.js"
import rateLimiter from "./middleware/rateLimiter.js"
import { authMidddleware } from "./middleware/auth.js"

const app = express()

app.use(express.json())
app.use(authMidddleware)
app.use(rateLimiter)
app.use("/api",testRoutes)

export default app