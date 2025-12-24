import express from "express";

const app = express();

app.use(express.json());

app.get("/", (__, res) => {
  res.send("Hello World");
});

export default app;
