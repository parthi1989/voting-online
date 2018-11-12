const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 3000;  
var app = express();
hbs.registerPartials(__dirname+'/views/Partials');
hbs.registerHelper('getCurrentYear',() => new  Date().getFullYear());
hbs.registerHelper('screamIT',(text,text2) => text.toUpperCase()+" "+text2.toLowerCase()); 
app.set('view engine','hbs');
app.use(express.static(__dirname+'/Public'));
app.use((req,res,next)=>{
    var now= new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + "\n",(err)=>{ if(err){console.log('unable to append');}});
    next();
})
app.get('/vote',(req,res) =>{
    //res.send(JSON.stringify(req));
    //res.send("Voted successfully");
    res.render('home.hbs',{PageTitle:"Home Page",BodyContent:"Welcome to Website" ,ABC:"ABC"});
})

app.listen(port,()=>console.log("Server is up and running in port " + port ));

// var message=encodeURIComponent("message with OTP : 123456");
//"https://smsapi.engineeringtgr.com/send/?Mobile=9962980733&Password=sendsms&Message="+message+"&To=9962980733&Key=parthV04X9KEUuyptWmleYLw"


