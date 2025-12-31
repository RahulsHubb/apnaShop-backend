import express from "express";
import productRoutes from "./routes/product.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import { logger } from "./middlewares/logger.js";
import { auth } from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger); // telling method and routes
// app.use(auth);
connectDb();

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
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);

app.use(errorHandler);

export default app;
