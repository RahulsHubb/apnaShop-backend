import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import app from "./app.js";
const PORT = process.env.PORT || 1080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
