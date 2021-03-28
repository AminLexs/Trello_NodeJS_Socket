const MONGOOSE = require('mongoose');

const SCHEMA = MONGOOSE.Schema;

const _TASK_SCHEMA = new SCHEMA({
  status:{
    type:String,
    required:true,
    trim:true
  },

  birthDate:{
    type:Date,
    required:true
  },

  deathDate:{
    type:Date,
    required:false
  },

  name:{
    type:String,
    required:false
  },

  fileName:{
    type:String,
    required:false
  },

  // userId:{
  //   type: MONGOOSE.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }

});

module.exports = {
  TASK_SCHEMA : _TASK_SCHEMA
};


