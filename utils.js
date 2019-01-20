var db = require('./db/db.js');

module.exports.AddUser=((data)=>{
    data.country="India";
    db.saveUser(data);
});