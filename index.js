import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const port = 8000;
app.use(express.json());
app.use(cors());

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

db.connect((err)=>{
    if(err) {console.log(err);return}
    console.log("db 접속 성공 !!!!")
});

app.get("/boards", (req,res)=>{
    const sql = "select * from board";
    db.query(sql, (err, results)=>{
        if(err) {
            console.log(err);
            return;
        }
        res.status(200).json(results);
    });
});

app.post("/boards", (req, res)=>{
    const {title, writer, pass, contents} = req.body.board;
    console.log(title, writer, pass, contents);
    const sql = "insert into board(title, writer,pass,contents) values(?,?,?,?)";
    db.query(sql, [title, writer, pass, contents], (err, results)=>{
        if(err) console.log(err);
        res.status(201).send("작성완료");
    });
});

app.listen(port, ()=>{
    console.log("localhost:8000 에서 서버가 실행중...");
});