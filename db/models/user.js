var mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const {ObjectID} = require('mongodb');




/*
var User = mongoose.model('USER', {
  IdentityId: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique:true
  },
  name: {
    type: String,
    required:true
  },
  age : {
    type: Number,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  updatedAt : {
    type: Number,
    default : null
  },
  mobile : {
    type : Number,
    required : [true,'User Mobile number required'],
    unique:true,
    minlength:10,
    validate : {
      validator : (v)=>{
        return /\d{10}/.test(v);
      },
      message : '{VALUE} is not a valid mobile number'
    }
  },
  email : {
    type : String,
    required:true,
    unique:true,
    validate : {
      validator : validator.isEmail,
      message : '{VALUE} is not a valid Email Id'
    }
  },
  password : {
    type:String,
    minlength:6,
    required:true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]

});
*/

var UserSchema = new mongoose.Schema({
  IdentityId: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique:true
  },
  name: {
    type: String,
    required:true
  },
  age : {
    type: Number,
    required:true
  },
  location: {
    type:String,
    required:true
  },
  updatedAt : {
    type: Number,
    default : null
  },
  mobile : {
    type : Number,
    required : [true,'User Mobile number required'],
    unique:true,
    minlength:10,
    validate : {
      validator : (v)=>{
        return /\d{10}/.test(v);
      },
      message : '{VALUE} is not a valid mobile number'
    }
  },
  email : {
    type : String,
    required:true,
    unique:true,
    validate : {
      validator : validator.isEmail,
      message : '{VALUE} is not a valid Email Id'
    }
  },
  password : {
    type:String,
    minlength:6,
    required:true
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]


});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject,['_id','email','location','updatedAt','name','age','IdentityId','mobile','tokens']);
}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id:user._id.toHexString(),access},'salt123').toString();
  
  //console.log(token);
  //user.tokens.concat([{access,token}]);
  user.tokens=user.tokens.concat([{access,token}]);
  

  //console.log(user);
  // console.log("generated token");
  // console.log(token);  
  return user.save().then(() => {
    return token
  });
};

UserSchema.methods.removetoken = function (token) {
  var user = this;
  return user.update({
    $pull:{
      tokens: {token}  
    }
  });
};




UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'salt123');
    // console.log("decoded");
    // console.log(decoded);
  } catch (e) {
    
    return Promise.reject();
  }
// console.log("return data");
// console.log(decoded);
/*
var userid=decoded._id;
userid = userid.toHexString();
console.log(userid);
*/

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

var User = mongoose.model('user',UserSchema);

module.exports = {User}