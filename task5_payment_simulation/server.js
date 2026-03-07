const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"yourpassword",
    database:"payment_db"
});

// Payment route with transaction
app.post("/pay", (req,res)=>{
    const {user, merchant, amount} = req.body;
    const conn = db.promise();

    conn.getConnection()
    .then(connection=>{
        connection.beginTransaction()
        .then(()=>{
            // Deduct from user
            return connection.query("SELECT balance FROM users WHERE id=?", [user]);
        })
        .then(([userData])=>{
            if(userData[0].balance < amount) throw new Error("Insufficient balance");
            return conn.query("UPDATE users SET balance = balance - ? WHERE id=?", [amount, user]);
        })
        .then(()=> connection.query("UPDATE merchants SET balance = balance + ? WHERE id=?", [amount, merchant]))
        .then(()=> connection.commit())
        .then(()=> {
            connection.release();
            res.json({message:"Payment Successful!"});
        })
        .catch(err=>{
            connection.rollback();
            connection.release();
            res.json({message:"Payment Failed: "+err.message});
        });
    });
});

app.listen(3000, ()=> console.log("Server running on port 3000"));