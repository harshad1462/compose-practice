const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "rootpass",
  database: "usersdb"
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    err => {
      if (err) return res.status(500).send("User exists");
      res.send("Registered successfully");
    }
  );
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (result.length > 0) {
        res.send(`Hi ${username}, logged in successfully`);
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

app.listen(4000, () => console.log("Backend running on 4000"));
