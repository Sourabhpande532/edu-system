const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  marks: Number,
  attendence: Number,
  grade: String,
});

const Student = mongoose.model("Student", studentSchema);
module.exports = { Student };
