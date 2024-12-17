const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); // Apply CORS options

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/echoVIT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Simple test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Define a simple schema for storing contact messages
const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

// Create a model based on the schema
const Message = mongoose.model("Message", messageSchema);

// API Route to save message to MongoDB
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res
      .status(201)
      .send({ success: true, message: "Message saved successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ success: false, message: "Failed to save message", error });
  }
});

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dow8ovkmb",
  api_key: "253948419817179",
  api_secret: "kFRMm5oPe5OGCWiX0BO1PNtSPVk",
});

// Multer Setup for Temporary File Storage
const upload = multer({ dest: "uploads/" });

// File Upload Route (Cloudinary Integration)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    console.log("This is filepath: ", filePath)
    // Upload File to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "notes_uploads",
    });

    // Delete Temporary File
    fs.unlinkSync(filePath);

    res.json({
      message: "File uploaded successfully",
      url: result.secure_url,
      name: req.file.originalname,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "File upload failed" });
  }
});

// Add Authentication Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
