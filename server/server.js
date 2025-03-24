import express from "express";
import mysql from "mysql";
import cors from "cors";

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
