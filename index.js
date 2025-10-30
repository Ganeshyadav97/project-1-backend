const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const CompanyJob = require("./routes/Company");
const UserApply = require("./routes/User");

const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (like curl/postman)
      if (!origin) return callback(null, true);

      // Allow local & vercel domains automatically
      if (
        origin === "http://localhost:3000" ||
        origin.endsWith(".vercel.app")
      ) {
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

// ✅ Handle preflight requests (important!)
app.options("*", cors());

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Routes
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/company", CompanyJob);
app.use("/user", UserApply);

// ✅ Root route for testing
app.get("/", (req, res) => {
  res.send("🚀 Backend running successfully with CORS enabled!");
});

// ✅ MongoDB connection
mongoose
  .connect("mongodb+srv://kanneboina:nani@cluster0.wl6wuhf.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}...`));
