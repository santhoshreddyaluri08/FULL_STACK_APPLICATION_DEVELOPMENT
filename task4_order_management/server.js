const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

// DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aakash",
    database: "shop_db"
});

// Customer order history with JOIN
app.get("/orders", (req, res) => {
    const sql = `
    SELECT c.name AS customer, p.name AS product, o.qty, (o.qty*p.price) AS total
    FROM orders o
    JOIN customers c ON o.customer_id=c.id
    JOIN products p ON o.product_id=p.id
    `;
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

// Highest value order
app.get("/highest-order", (req, res) => {
    const sql = `
    SELECT c.name AS customer, p.name AS product, o.qty, (o.qty*p.price) AS total
    FROM orders o
    JOIN customers c ON o.customer_id=c.id
    JOIN products p ON o.product_id=p.id
    ORDER BY total DESC LIMIT 1
    `;
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results[0]);
    });
});

// Most active customer
app.get("/most-active", (req,res)=>{
    const sql = `
    SELECT c.name, COUNT(*) AS orders_count
    FROM orders o
    JOIN customers c ON o.customer_id=c.id
    GROUP BY c.name
    ORDER BY orders_count DESC LIMIT 1
    `;
    db.query(sql, (err, results)=>{
        if(err) throw err;
        res.json(results[0]);
    });
});

app.listen(3000, ()=> console.log("Server running on port 3000"));