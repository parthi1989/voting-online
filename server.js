require('./config/config')

const express = require('express');
var bodyParser = require('body-parser');
const hbs = require('hbs');
const fs = require('fs');
const {ObjectID} = require('mongodb');
const utils = require('./utils');
var {mongoose} = require('./db/db');
var {User} = require('./db/models/user');
var {Vote} = require('./db/models/vote');
var {authenticate} = require('./middleware/authenticate');

const _ = require('lodash');



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
        if(!users){
            res.status(404).send();null
        }
        res.send({users});
      }, (e) => {
        res.status(400).send(e);
      });
});

app.get('/fetchuser/:IdentityId',(req,res) =>{
    var IdentityId = req.params.IdentityId;


    
    User.find({IdentityId}).then((users) => {
        //console.log("fetched User: " + users);
        res.send({users});
      }, (e) => {
        res.status(400).send(e);
      });
});


app.post('/vote',(req,res) => {
    var vote = new Vote(req.body);
    //console.log("body : " + JSON.stringify(req.body,undefined,2));
    vote.save().then((votes)=>{
        //console.log("received success"+vote);
        res.send(votes);
    }, (e) => {
        //console.log("received failure"+e);
        res.status(400).send(e);
    }).catch((e)=> res.status(400).send(e));
});

app.post('/SaveUser',(req,res) => {
/*
    console.log("Save user ");
    User.find().then((users) => {
        if(!users){
            console.log("404");
        }
        console.log("existing users");
        console.log(users);
      }, (e) => {
        console.log("404");
      });
    console.log(_.pick(req.body,['name','age','location','IdentityId','mobile','email','password','_id']));
*/    
    var ruser = _.pick(req.body,['name','age','location','IdentityId','mobile','email','password','_id']);
    //console.log("saveuser");
    //console.log(ruser);
    var ruser = new User(ruser);
    //console.log("compiled user ");
    //console.log(ruser);
    ruser.save().then((user)=>{
        //console.log("received success"+user);
        //res.send(user);
        return ruser.generateAuthToken();
        }, (e) => {
        //console.log("received failure"+e);
        res.status(400).send(e);
        }
    ).then((token)=>{
        //console.log('setting token');
        res.header('x-auth',token).send(ruser);
    }).catch((e)=> {
        //console.log("received error"+e);
        //console.log(e);
        res.status(400).send(e)
    });
});

app.delete('/vote/:id',(req,res) =>{
    
    if(!ObjectID.isValid(req.params.id)) {
        res.status(404).send();
    }
    //console.log("delete id : " +    req.params.id);
    Vote.findByIdAndDelete(req.params.id).then((vote) => {
        //console.log("delete vote: " + users);
        if(!vote){
            res.status(404).send();
        }
        res.status(200).send({vote});
      }, (e) => {
        res.status(400).send(e);
      });
});



app.patch('/user/:id', (req, res) => {
    var id = req.params.id;
    //console.log("params"+req.params);
    var body = _.pick(req.body, ['name', 'IdentityId','age','location']);
    //console.log("body" + body);
    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }
    
    body.updatedAt = new Date().getTime();
    
    
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      //console.log("Updated user" + user);
      res.send({user});
    }).catch((e) => {
      res.status(400).send();
    })
  });

app.delete('/users/me/token',authenticate, (req, res) => {
  req.user.removetoken(req.token).then(()=>{
    res.status(200).send();
  },()=>{
    res.status(400).send();
  });
});



/*
  app.get('/SaveUser',(req,res) =>{
    //res.send(JSON.stringify(req));
    //res.send("Voted successfully");
    //console.log(JSON.stringify(req,undef,2));
    
    var obj = utils.AddUser(req);
    console.log(obj);
    res.render(obj);
});
*/


app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
  });

app.get('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  
  


// console.log(body);
  User.find(body).then((fuser)=>{
    // console.log("fetched user"+  fuser);
    if(!fuser)
    {return res.status(404).send("User not available");}
    //fuser.toObject();
    
    
    
    //console.log("specific");
    var userobject= Object.values(fuser);
    //console.log(userobject[0].tokens[0].token);
    //var ruser = new User(ruser);
    return userobject[0].tokens[0].token;
  }).then((token)=>{
    //console.log("tokens" + token);
    res.header('x-auth',token);
    res.status(200).send();
  }).catch((e)=> {
    //console.log("received error"+e);
    //console.log(e);
    res.status(404).send(e);
});

});
  
  

module.exports.app = app;

app.listen(process.env.PORT,()=>console.log("Server is up and running in port " + process.env.PORT ));



// var message=encodeURIComponent("message with OTP : 123456");
//"https://smsapi.engineeringtgr.com/send/?Mobile=9962980733&Password=sendsms&Message="+message+"&To=9962980733&Key=parthV04X9KEUuyptWmleYLw"


