import express from "express"
import adminRoutes from "./routes/admin.routes.js"
import testRoutes from "./routes/test.routes.js"
import rateLimiter from "./middleware/rateLimiter.js"
import { authMidddleware } from "./middleware/auth.js"


const app = express()

app.use(express.json())
app.use(authMidddleware)
app.use('/admin',adminRoutes)
app.use(rateLimiter)
app.use("/api",testRoutes)
app.use((req, res) => {
  res.status(404).send("Route not found");
});
export default app