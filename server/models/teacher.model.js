const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
  name: String,
  subject: String,
  age: Number,
});
module.exports = mongoose.model("Teacher", TeacherSchema);
