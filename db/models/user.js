var mongoose = require('mongoose');

var User = mongoose.model('USER', {
  IdentityId: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
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
  }
});

module.exports = {User}