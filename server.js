import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json()); // Untuk parsing JSON
// app.use(cors()); // Aktifkan CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup storage untuk Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
});

// Endpoint untuk upload gambar
app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    const imageUrls = filePaths.map((filePath) => ({
      data_url: `http://localhost:5173${filePath}`,
    }));

    res.json(imageUrls);
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send("Error uploading file");
  }
});

// Endpoint untuk menambahkan catatan dan URL gambar ke JSON Server
app.post("/notes", async (req, res) => {
  try {
    const noteData = req.body;

    // Ambil gambar URL dan tambahkan ke catatan
    if (noteData.images && noteData.images.length > 0) {
      noteData.images = noteData.images.map((image) => ({
        data_url: `${image.data_url}`,
      }));
    }

    // Simpan catatan dengan URL gambar ke JSON Server
    await axios.post("http://localhost:3000/notes", noteData);

    res.status(201).json(noteData);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send("Error saving note");
  }
});

// Endpoint untuk mengedit catatan
app.put("/notes/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedNoteData = req.body;

    // Update catatan di JSON Server
    await axios.put(`http://localhost:3000/notes/${noteId}`, updatedNoteData);

    res.status(200).json(updatedNoteData);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Error updating note");
  }
});

// Endpoint untuk menghapus gambar berdasarkan URL-nya
app.delete("/upload", async (req, res) => {
  try {
    const { imageUrl } = req.body; // Ambil URL gambar dari body request
    const filePath = path.join(
      __dirname,
      imageUrl.replace("http://localhost:5173", "")
    );

    // Hapus file gambar dari server
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).send("File deleted successfully");
    } else {
      res.status(404).send("File not found");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).send("Error deleting file");
  }
});

app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
