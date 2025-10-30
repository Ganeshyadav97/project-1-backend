const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const CompanyJob = require("./routes/Company");
const UserApply = require("./routes/User");

const app = express();

// ✅ Allowed frontend domains
const allowedOrigins = [
  "https://project-1-git-main-ganeshyadav97s-projects.vercel.app",
  "https://project-1-699jojd8x-ganeshyadav97s-projects.vercel.app",
  "http://localhost:3000", // for local testing
];

// ✅ Configure CORS
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests from known origins or no-origin tools (Postman, etc.)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Parse JSON
app.use(express.json());

// ✅ API Routes
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/company", CompanyJob);
app.use("/user", UserApply);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully with CORS configured!");
});

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://kanneboina:nani@cluster0.wl6wuhf.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
