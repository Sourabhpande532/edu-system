require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { initializeDatabase } = require("./db/db.connection");
const { Student } = require("./models/student.model");

app.use(cors());
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

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
