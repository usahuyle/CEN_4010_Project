//Creating the express and app variable to be able to use backend
const express = require("express");
const app = express();

//Setting up connection to AWS RDS database
const mysql = require("mysql");

const connection = mysql.createConnection({
    host     : "database-1.cjwufjoqjxuz.us-east-1.rds.amazonaws.com",
    user     : "admin",
    password : "westboca2022",
    port     : "3307",
    database : "westboca"
})




//Closing connection to database
connection.end();

//Setting up the backend to listen on a specific port
app.listen(3000, ()=>{
    console.log("Server listening on port 3000...");
})