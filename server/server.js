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
app.listen(8001, () => {
  console.log("Listening");
});
