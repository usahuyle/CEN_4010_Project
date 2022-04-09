//Creating the express and app variable to be able to use backend
const express = require("express");
const app = express();

//Setting up connection to AWS RDS database
const mysql = require("mysql");

//Setting up static folder
app.use(express.static("Front-end"));

//Setting up body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "sql5.freemysqlhosting.net",
    user: "sql5484194",
    password: "l4x5CaT2fA",
    port: 3306,
    database: "sql5484194"
})

//Variables to store user data
let currentUser = 0;
let userEvents={};

app.get("/", (req,res)=>{

    res.sendFile(__dirname + "/Front-end/login.html");

})

app.get("/login.html", (req,res)=>{

    res.sendFile(__dirname + "/Front-end/login.html");

})


app.get("/register.html", (req,res)=>{

    res.sendFile(__dirname + "/Front-end/register.html");

})

app.get("/index.html", (req,res)=>{

    res.sendFile(__dirname + "/Front-end/dashboard.html");

})

app.get("/register.html", (req,res)=>{

    res.sendFile(__dirname + "/Front-end/password.html");

})

//Post Requests
app.post("/login",(req,res)=>{
    
    const userName = req.body.inputUsername;
    const userPassword = req.body.inputPassword;
    let query = "Select * from resident r where r.residentID = ?";
    
    if(userName == "Admin")
    {
        query = "select * from admin a where a.adminID = ?";
        connection.query(query,["Admin"],(er,result)=>{
            if(er) console.log(er);

            query = "select a.adminID, e.dateOfEvent, e.description,e.name from event e, admin a where a.adminID = ?"
            connection.query(query,["Admin"],(er,result)=>{
                if(er) console.log(er);
                
                userEvents = Object.values(JSON.parse(JSON.stringify(result)));
                //console.log(JSON.stringify(userEvents));
                res.json(userEvents);
            })
        })
    }
    else{
        connection.query(query,[userName],(er,result)=>{
            if(er) throw console.log(er);
            if(result.length == 0)
            {

            }
            else{
                currentUser = userName;
                if(result[0].password == userPassword)
                {
                    currentUser = userName
                    
                    query = "select r.name as user,e.dateOfEvent, e.description,e.name from resident r, manages m, event e where r.residentID = ? and m.residentID = r.residentID and m.eventID = e.eventID;"
                    connection.query(query,[currentUser], (er,result)=>{
                        if (er) throw console.log(er);
                        
                        userEvents = Object.values(JSON.parse(JSON.stringify(result)));
                        //console.log(JSON.stringify(userEvents));
                        res.json(userEvents);
                        
                    })
                }

            }

        })
    }
})

app.post("/register",(req,res)=>{
    
    const name = req.body.inputFirstName + " " + req.body.inputLastName;
    const password = req.body.inputPassword;

    if(name == "")
    {
        res.end();
    }
    else{
    
        let query = "Select * from resident r where r.name = ?";
        connection.query(query,[name],(er,result)=>{
            if(er) console.log(er);

            if(result.length == 0)
            {
                let query = "insert into resident(name,password)values(?,?);";
                
                connection.query(query,[name,password],(er,result)=>{
                    if(er) console.log(er);
                    res.sendFile(__dirname + "/Front-end/login.html");
                })
            }
            else{
                res.send("User already exists");
            }
        })
        
    }
})

//Setting up the backend to listen on a specific port

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, ()=>{
    console.log("Server has started succesfully");
})