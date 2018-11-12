const express = require('express');
const port = process.env.PORT || 3000;  
var app = express(); 

app.use(express.static(__dirname+'/Public'));

app.get('/vote',(req,res) =>{
    //res.send(JSON.stringify(req));
    res.send("Voted successfully");
})

app.listen(port,()=>console.log("Server is up and running in port " + port ));

// var message=encodeURIComponent("message with OTP : 123456");
//"https://smsapi.engineeringtgr.com/send/?Mobile=9962980733&Password=sendsms&Message="+message+"&To=9962980733&Key=parthV04X9KEUuyptWmleYLw"


