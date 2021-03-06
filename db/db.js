//const MongoClient = require('mongodb').MongoClient;

/*
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  
});
*/
module.exports.saveUser = (user) => {
    console.log('saving user ' + JSON.stringify(user,undefined,2));
    db.collection('USERS').insertOne(user, (err, result) => {
        if (err) {
          return console.log('Unable to insert user', err);
        }
    
        console.log(result.ops);
      });
    
      db.close();
}


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
console.log(process.env.MONGODB_URL || 'mongodb://localhost:27017/Vote');

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true});
//mongoose.connect('mongodb://localhost:27017/TodoApp');



/*var Todo = mongoose.model('votes',{
    IdentityId:{type:string,required:true,},
    PartyId:{type:number,required:true},
    center:{type:string,required:true},
});
})
*/



module.exports = {mongoose};