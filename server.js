const express = require('express');
var bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const utils = require('./utils');
var {mongoose} = require('./db/db');
var {User} = require('./db/models/user');
var {Vote} = require('./db/models/vote');


const port = process.env.PORT || 3000;  
var app = express();
app.use(bodyParser.json());

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
});
app.get('/fetchvotes',(req,res) =>{
    //res.send(JSON.stringify(req));
    //res.send("Voted successfully");
    //res.render('home.hbs',{PageTitle:"Home Page",BodyContent:"Welcome to Website" ,ABC:"ABC"});
    Vote.find().then((votes) => {
        res.send({votes});
      }, (e) => {
        res.status(400).send(e);
      });
    
   /*var vote = new Vote({
    IdentityId: "ADH007",
    PartyId: "PAR003",
    location: 600020,
    center:"ADR002"
  });

  vote.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
  */
});

app.get('/fetchusers',(req,res) =>{
    User.find().then((users) => {
        res.send({users});
      }, (e) => {
        res.status(400).send(e);
      });
});

app.post('/vote',(req,res) => {
    var vote = new Vote(req.body);
    vote.save().then((votes)=>{
        //console.log("received success"+vote);
        res.send(votes);
    }, (e) => {
        //console.log("received failure"+e);
        res.status(400).send(e);
    }).catch((e)=> res.status(400).send(e));
});


/*
app.get('/SaveUser',(req,res) =>{
    //res.send(JSON.stringify(req));
    //res.send("Voted successfully");
    //console.log(JSON.stringify(req,undef,2));
    
    var obj = utils.AddUser(req);
    console.log(obj);
    res.render(obj);
})
*/



module.exports.app = app;

app.listen(port,()=>console.log("Server is up and running in port " + port ));



// var message=encodeURIComponent("message with OTP : 123456");
//"https://smsapi.engineeringtgr.com/send/?Mobile=9962980733&Password=sendsms&Message="+message+"&To=9962980733&Key=parthV04X9KEUuyptWmleYLw"


