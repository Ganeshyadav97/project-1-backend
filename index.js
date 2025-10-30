const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const CompanyJob = require("./routes/Company");
const UserApply = require("./routes/User");

const app = express();

// ✅ Allow frontend domain (Vercel + localhost)
const allowedOrigins = [
  "https://project-1-nu-two.vercel.app", // deployed frontend
  "http://localhost:3000",               // local testing
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests (very important for browsers)
app.options("*", cors());

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Routes
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/company", CompanyJob);
app.use("/user", UserApply);

// ✅ MongoDB Connection
mongoose
  .connect("mongodb+srv://kanneboina:nani@cluster0.wl6wuhf.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Root route (for quick check)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
