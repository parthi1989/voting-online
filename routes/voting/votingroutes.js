var {mongoose} = require('../../db/db');
const {ObjectID} = require('mongodb');
var {User} = require('../../db/models/user');
var {Vote} = require('../../db/models/vote');
const utils = require('../../utils');
const _ = require('lodash');
const HttpStatus = require('http-status-codes');


//app.get('/fetchvotes',(req,res) =>{
module.exports.fetchvotes = async (req, res) => {
    //res.send(JSON.stringify(req));
    //res.send("Voted successfully");
    //res.render('home.hbs',{PageTitle:"Home Page",BodyContent:"Welcome to Website" ,ABC:"ABC"});
    Vote.find().then((votes) => {
        res.send({votes});
      }, (e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
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
    res.status(HttpStatus.BAD_REQUEST).send(e);
  });
  */
};





//app.get('/fetchusers',(req,res) =>{
module.exports.fetchusers = async (req,res) =>{
    User.find().then((users) => {
        if(!users){
            res.status(HttpStatus.NOT_FOUND).send();
        }
        res.send({users});
      }, (e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
    });
};

//app.get('/fetchuser/:IdentityId',(req,res) =>{
module.exports.fetchspecificuser = async (req,res) =>{
    var IdentityId = req.params.IdentityId;

    User.find({IdentityId}).then((users) => {
        //console.log("fetched User: " + users);
        res.send({users});
      }, (e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
      });
};



//app.post('/vote',(req,res) => {
module.exports.vote = async (req,res) => {
        var vote = new Vote(req.body);
        //console.log("body : " + JSON.stringify(req.body,undefined,2));
        vote.save().then((votes)=>{
            //console.log("received success"+vote);
            res.send(votes);
        }, (e) => {
            //console.log("received failure"+e);
            res.status(HttpStatus.BAD_REQUEST).send(e);
        }).catch((e)=> res.status(HttpStatus.BAD_REQUEST).send(e));
};
    
//app.post('/SaveUser',(req,res) => {
module.exports.saveuser = async (req,res) => {
    /*
    console.log("Save user ");
    User.find().then((users) => {
        if(!users){
            console.log("HttpStatus.NOT_FOUND");
        }
        console.log("existing users");
        console.log(users);
        }, (e) => {
        console.log("HttpStatus.NOT_FOUND");
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
        res.status(HttpStatus.BAD_REQUEST).send(e);
        }
    ).then((token)=>{
        //console.log('setting token');
        res.header('x-auth',token).send(ruser);
    }).catch((e)=> {
        //console.log("received error"+e);
        //console.log(e);
        res.status(HttpStatus.BAD_REQUEST).send(e)
    });
};
    
//app.delete('/vote/:id',(req,res) =>{
module.exports.deletevote = async(req,res) => {
    if(!ObjectID.isValid(req.params.id)) {
        res.status(HttpStatus.NOT_FOUND).send();
    }
    //console.log("delete id : " +    req.params.id);
    Vote.findByIdAndDelete(req.params.id).then((vote) => {
        //console.log("delete vote: " + users);
        if(!vote){
            res.status(HttpStatus.NOT_FOUND).send();
        }
        res.status(HttpStatus.OK).send({vote});
        }, (e) => {
        res.status(HttpStatus.BAD_REQUEST).send(e);
        });
};
    
    
    
//app.patch('/user/:id', (req, res) => {
module.exports.updateuser = async (req, res) => {
    var id = req.params.id;
    //console.log("params"+req.params);
    var body = _.pick(req.body, ['name', 'IdentityId','age','location']);
    //console.log("body" + body);
    if (!ObjectID.isValid(id)) {
        return res.status(HttpStatus.NOT_FOUND).send();
    }
    
    body.updatedAt = new Date().getTime();
    
    
    User.findByIdAndUpdate(id, {$set: body}, {new: true}).then((user) => {
        if (!user) {
        return res.status(HttpStatus.NOT_FOUND).send();
        }
        //console.log("Updated user" + user);
        res.send({user});
    }).catch((e) => {
        res.status(HttpStatus.BAD_REQUEST).send();
    })
};

//app.delete('/users/me/token',authenticate, (req, res) => {
module.exports.deleteuser = async (req, res) => {
    req.user.removetoken(req.token).then(()=>{
    res.status(HttpStatus.OK).send();
    },()=>{
    res.status(HttpStatus.BAD_REQUEST).send();
    });
};
    
    
    
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
    
    
//app.get('/users/me', authenticate, (req, res) => {
module.exports.fetchuserauthenticated = async (req, res) => {
    res.send(req.user);
};
    
//app.get('/users/login', (req, res) => {
module.exports.userlogin = async (req, res) => {
    
    var body = _.pick(req.body, ['email', 'password']);
    //console.log(body);
    User.find(body).then((fuser) => {
    // console.log("fetched user"+  fuser);
    if(!fuser) {
        console.log("user not found")
        return res.status(HttpStatus.NOT_FOUND).send("User not available");
    }
    //fuser.toObject();
    //console.log("specific");
    var userobject= Object.values(fuser);
    //console.log(userobject[0].tokens[0].token);
    //var ruser = new User(ruser);
    return userobject[0].tokens[0].token;
    //return userobject.generateAuthToken();
    }).then((token) => {
        //console.log("tokens" + token);
        res.header('x-auth',token);
        res.status(HttpStatus.OK).send("successful");
    }).catch((e) => {
        console.log("received error"+e);
        //console.log(e);
        res.status(HttpStatus.NOT_FOUND).send(e);
    });


};

