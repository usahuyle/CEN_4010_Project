
const root = "http://localhost:3000/";

let login = document.getElementById("loginForm");
let test;

login.addEventListener("submit",evt => {

    evt.preventDefault();
    const o = {};

    new FormData(login).forEach((value,key)=>o[key] = value)

    fetch("http://localhost:3000/login",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(o)
    }).then(res=>{
        res.json().then(data=>{
            sessionStorage.setItem("events", JSON.stringify(data));
            });
    }).catch(er=>{
        console.log(er);
    }).finally(()=>{ 
        let temp = JSON.parse(sessionStorage.getItem("events"));
        if(temp[0].adminID === "Admin")
        {
            location.href = "index_admin.html";
        }
        else{
            location.href = "dashboard.html";
        }
    })
  });
