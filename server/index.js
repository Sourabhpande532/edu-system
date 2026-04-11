require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { initializeDatabase } = require("./db/db.connection");
const { Student } = require("./models/student.model");
const Teacher = require("./models/teacher.model");
const { error } = require("console");

const corsOption = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOption));
app.use(express.json());
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to expressjs");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/students", async (req, res) => {
  const { name, age, grade } = req.body;
  try {
    const student = new Student({ name, age, grade });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const updatedStudentData = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedStudentData,
      { new: true },
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const deleteStudent = await Student.findByIdAndDelete(studentId);
    if (!deleteStudent) {
      return res.status(404).json({ error: "Student not found." });
    }
    res.status(200).json({
      message: "Student deleted successfully",
      student: deleteStudent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Routes
app.get("/teachers", async (req, res) => {
  const teacher = await Teacher.find();
  res.json(teacher);
});

app.post("/teachers", async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.json(teacher);
});

app.delete("/teachers/:id", async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
