const MONGOOSE = require('mongoose');
var taskSchema = require('./schemas/taskSchema');
var userSchema = require('./schemas/userSchema');

var password = '86KcFGzr349TDbj';
var dbName = 'mppDatabase';
var user = 'polygonum';
var url = 'mongodb+srv://' + user + ':' + password + '@mmptask.bq0wy.mongodb.net/' + dbName + '?retryWrites=true&w=majority';

const _TASK = MONGOOSE.model('Task', taskSchema.TASK_SCHEMA);
const _USER = MONGOOSE.model('User', userSchema.USER_SCHEMA);

var _connect = function con(){
    MONGOOSE.connect(url,{useNewUrlParser: true, useUnifiedTopology: true}, (error, client)=>{
        if(error){
            console.log(error);
            return;
        }
    });
}

var _disconnect = function discon(){
    MONGOOSE.disconnect();
}

module.exports = {
    connect : _connect,
    disconnect : _disconnect,
    TASK : _TASK,
    USER: _USER
};