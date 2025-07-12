// import dotenv from "dotenv";
// import connectDb from "./db/db.js";
// import app from "../src/app.js";

// dotenv.config();

// const port = process.env.PORT;
// connectDb().then(() => {
//   app.listen(port, () => {
//     console.log("Server is running....");
//   });
// });


import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config(); // ✅ Load environment variables

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in .env file");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
  });
