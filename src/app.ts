import express from "express";
import productRoutes from "./routes/product.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDb } from "./config/db.js";
import userRoutes from './routes/user.routes.js'

const app = express();

app.use(express.json());
connectDb();
app.use(logger);
// app.use(auth);

app.get("/", (__, res) => {
  res.send("Hello World");
  console.log("hello guys");
});
app.get("/test", async (req, res, next) => {
  try {
    throw new Error("Boom 💥");
  } catch (err) {
    next(err);
  }
});
app.use("/api/products", productRoutes);
app.use("/api/profile", profileRoutes);
app.use('/api', userRoutes);

app.use(errorHandler);

export default app;
