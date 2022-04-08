let registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    const o = {};

    new FormData(registerForm).forEach((value,key)=>o[key] = value)
    
    
    fetch("http://localhost:3000/register",{
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(o)
    }).catch(er=>{
        console.log(er);
    }).finally(()=>{ 
        location.href = "login.html"
    })
})