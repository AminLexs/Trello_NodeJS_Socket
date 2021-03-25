require('dotenv').config();

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const QUERY = require("../includes/queries");

exports.login = function(socket){
    socket.on("LOGIN", async function(data, callback) {
        let user = await QUERY.findUserByLogin(data.login);
        if(user && user[0]){
            const hash = await bcrypt.hash(data.password, user[0].salt);
            if(!user[0].password.localeCompare(hash)){
                const _token = jwt.sign({login : data.login}, process.env.KEY) ///, expires : date, {expiresIn : 60*1000} 1 arg is obj if use option /// can be a stirng if don't use /////////fuuuck
                callback({ statusCode : 200, token : _token})
            }
        }
        let err = new Error();
        err.statusCode = 401;
        callback(err)
    })
}

exports.register = function(socket){
    socket.on("REGISTER", async function(data, callback){

        let user =  await QUERY.findUserByLogin(data.login);

        if(user[0]){
           callback({statusCode:401, message : 'Login already exists'});
           return;
        }

        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.password, salt);
            let newUser = await QUERY.addNewUser(data.login, hashedPassword, salt);
            const _token = jwt.sign({login : newUser.login}, process.env.KEY);
            callback({ statusCode : 201, token : _token})
        } catch (error) {
            callback({ statusCode : 500, message : "Internal server error"})
        }
        
    })
}
