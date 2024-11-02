const express = require("express");
const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");
// const routes = require("./routes/index");

const corsOptions = {
  origin: ["http://localhost:5173"],
};

const app = express();

app.use(cors(corsOptions));
app.use("/utils/profilephotos", express.static("utils/profilephotos"));
app.use(express.json());
// app.use(routes);

const storage = multer.diskStorage({
  destination: "utils/profilephotos",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);
    if (extname && mimeType) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

//REGISTER
app.post("/register", upload.single("image"), async (req, res) => {
  const { name, username, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/utils/profilephotos/${
        req.file.filename
      }`;
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        image: imageUrl,
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//ADD MARKS
app.post("/marks/:studentId", async (req, res) => {
  const { mathematics, english, science, history, geography } = req.body;
  const { studentId } = req.params;

  try {
    const student = await prisma.user.findUnique({
      where: { id: parseInt(studentId) },
    });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const marks = await prisma.marks.create({
      data: {
        mathematics,
        english,
        science,
        history,
        geography,
        studentId: parseInt(studentId),
      },
    });

    res.status(201).json({ message: "Marks added successfully", marks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//GET MARKS
app.get("/marks/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const marks = await prisma.marks.findMany({
      where: { studentId: parseInt(studentId) },
    });

    if (marks.length === 0) {
      return res.status(404).json({ error: "No marks found for this student" });
    }

    res.status(200).json({ marks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
