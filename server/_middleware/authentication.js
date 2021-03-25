require('dotenv').config();
var jwt = require('jsonwebtoken');
var cookie = require('cookie');

exports.checkToken = function(req, res, next){
    const token = req.cookies['auth-token'];

    if(!token)
        return res.sendStatus(401);

    try{
     const verified = jwt.verify(token, process.env.KEY)
        req.user = verified;
        next();       
    }catch{
        res.sendStatus(401);
    }

}

exports.checkTokenSocket = function(socket, packet, next){
    if(packet[0] != 'LOGIN' && packet[0] != 'REGISTER' && packet[0] != 'GET_TASKS'){
        let err = new Error();
        err.statusCode = 401;
        if(socket.request.headers.cookie){
            const cookie_token = socket.request.headers.cookie;
            const token=cookie.parse(cookie_token)['auth']
            try{
                const verified = jwt.verify(token, process.env.KEY)
                next();       
            }catch(error){
                next(err)
            }
        }else
            next(err)
    }else
        next();
}