const DAO = require('../includes/db.js');

exports.getTasks = async function(_status){
    DAO.connect();
    return await DAO.TASK.find(_status ? {status : _status} : {})
    .then(rows => {
        DAO.disconnect();
        return rows;
    })
    .catch(err => {
        console.log(err);
        return;
    });
}

exports.deleteTask = async function(id){
    DAO.connect();
    return await DAO.TASK.deleteOne({_id : id})
        .then(()=>{
            DAO.disconnect();
            return 204;
        })
        .catch(err =>{
            throw err;
        });
}

exports.insertTask = async function(data, _fileName){
    DAO.connect();
    let task = new DAO.TASK({
        status : 'inProgress',
        birthDate : Date.now(),
        deathDate : null,
        name : data.task_name,
        fileName : _fileName,
         
    });
    return await task.save()
            .then(obj => {
                DAO.disconnect();
                return 201
            })
            .catch(err => {
                console.log(err);
                throw 500;
            }); 
}

exports.updateTask = async function(data, _fileName){
    console.log(data);
    let d = new Date(Date.parse(data.deathDate));

    let fileName = _fileName;
    if (data.text_file || (!data.text_file && !data.deleteFlag)) {
        fileName = data.text_file ? data.filename : data.prev_file;
    }
    DAO.connect();
    return await DAO.TASK.findByIdAndUpdate(data.id, {
        "$set": {
            "name": data.name, "fileName": _fileName,
            "status": data.status, "deathDate": d
        }
    },
        { new: true })
        .then(obj => {
            DAO.disconnect();
            return 201;
        })
        .catch(err => {
            console.log(err);
            return 400;
        });
}

exports.findUserByLogin = async function findUserByLogin(_login){
    DAO.connect();
    return DAO.USER.find({login: _login})
        .then(res => {
            DAO.disconnect();
            return res;
        })
        .catch(err => {
            console.log(err);
            return res.sendStatus(500)
        });
}

exports.addNewUser = async function addNewUser(login, hashedPassword, salt){
    DAO.connect();
        let newUser = new DAO.USER({
            login : login,
            password: hashedPassword,
            salt: salt
        });
        return newUser.save()
                .then(obj => {
                    DAO.disconnect();
                    return obj;
                })
                .catch(err => {
                    console.log(err);
                }); 
}