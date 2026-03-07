// server.js
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "yourpassword",
  database: "student_db"
});

db.connect();

app.post("/register", (req, res) => {
  const { name, email, dob, department, phone } = req.body;
  const sql = "INSERT INTO students (name,email,dob,department,phone) VALUES (?,?,?,?,?)";
  db.query(sql, [name, email, dob, department, phone], (err, result) => {
    if (err) throw err;
    res.send("Student Registered!");
  });
});

app.get("/students", (req, res) => {
  db.query("SELECT * FROM students", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));