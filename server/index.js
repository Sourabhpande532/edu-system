require("dotenv").config();
const express = require("express");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const { initializeDatabase } = require("./db/db.connection");
const app = express();
initializeDatabase();

app.get("/", (req, res) => {
  res.send("Welcome to expressjs");
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
