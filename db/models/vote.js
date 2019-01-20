var mongoose = require('mongoose');

var Vote = mongoose.model('Vote', {//it converts name to lowercase and adds s at last for collection so collecton name will be votes 
  IdentityId: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    unique: true
  },
  PartyId: {
    type: String,
    required:true
  },
  location : {
    type: Number,
    required:true
  },
  center: {
    type:String,
    required:true
  }
});

module.exports = {Vote}