//Creating the express and app variable to be able to use backend
const express = require("express");
const app = express();

//Setting up the backend to listen on a specific port
app.listen(3000, ()=>{
    console.log("Server listening on port 3000...");
})