var db = require('./db/db.js');

module.exports.AddUser=((data)=>{
    db.saveUser({name:data.name,mobile:data.mobile,IdentityId:data.IdentityId,country:"India"});
});