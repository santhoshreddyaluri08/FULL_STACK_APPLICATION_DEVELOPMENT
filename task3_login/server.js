const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // allow frontend requests

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "yourpassword",
    database: "student_db" // reuse or create 'users' table
});

db.connect();

// Create users table if not exists
db.query(`
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50),
    password VARCHAR(50)
)
`);

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM users WHERE email=? AND password=?";
    db.query(sql, [email, password], (err, results) => {
        if(err) throw err;
        if(results.length > 0){
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));