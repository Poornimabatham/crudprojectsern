import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "rds-dev-jan-25.cv0cmgoqam9i.ap-south-1.rds.amazonaws.com",
  user: "ubiATT",
  password: "Ubitech@123",
  database: "ubitechdb01",
});

app.get("/", (req, res) => {
  const sql = "Select * From EmployeeMaster Where OrganizationId = 10 limit 10";
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) return res.json({ Message: "error inseide server" });
    return res.json(result);
  });
});

app.post("/employee",(req,res)=>{
    const sql = 'INSERT INTO EmployeeMaster (`FirstName`,`EmployeeCode`) VALUES(?)';
     const values =[
        req.body.name,
        req.body.Code

     ]
     db.query(sql,[values,(err,result)=>{
        if(err) return res.json(err)
     }])
})




app.get("/employees/:id", (req, res) => {
  const sql = "Select * From EmployeeMaster Where Id = ?";
  const values = [req.params.id];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Message: "error in updating server" });
    return res.json({ Message: "Employee updated successfully" });
  });
})


app.put("/editemployee/:id", (req, res) => {
  const sql = "UPDATE EmployeeMaster SET FirstName =? WHERE EmployeeId =?";
  const values = [req.body.name, req.params.id];
  db.query(sql, values, (err, result) => {
    if (err) return res.json({ Message: "error in updating server" });
    return res.json({ Message: "Employee updated successfully" });
  });
})


app.delete("/deleteemployees/:id", (req, res) => {
  const sql = "DELETE FROM EmployeeMaster WHERE Id = ?";
  
  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.json({ message: "Employee deleted successfully" });
  });
});

app.listen(8001, () => {
  console.log("Listening");
});




// Signup Route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating user", error: err });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.insertId, email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      data: { userId: result.insertId, email, token },
    });
  });
});

// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error", error: err });

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secretkeyappearshere",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      data: { userId: user.id, email: user.email, token },
    });
  });
});

// Start Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


