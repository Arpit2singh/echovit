const express = require("express");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");

const router = express.Router();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dow8ovkmb",
  api_key: "253948419817179",
  api_secret: "kFRMm5oPe5OGCWiX0BO1PNtSPVk",
});

// Multer Setup for Temporary File Storage
const upload = multer({ dest: "uploads/" });

// Upload Route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;

    // Upload File to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
      folder: "notes_uploads",
    });

    // Delete Temporary File
    fs.unlinkSync(filePath);

    res.status(200).json({
      message: "File uploaded successfully",
      url: result.secure_url,
      name: req.file.originalname,
    });
  } catch (error) {
    console.error("Error uploading file:", error.message);
    res.status(500).json({ message: "File upload failed", error: error.message });
  }
});

module.exports = router;

