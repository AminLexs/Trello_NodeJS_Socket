import { socket } from "../components/root";
var cookie = require('cookie'); 

const API = {
    getTasks(status){
        return new Promise((resolve, reject) => {
            socket.emit("GET_TASKS", status, responseData => {
                if (responseData.statusCode == 400) {
                    console.log(responseData.msg);
                    reject(responseData)
                }
                if (responseData.statusCode == 200) {
                    resolve(responseData.result)
                }
            });
        })
    },

    deleteTask(id){
        return new Promise((resolve, reject) => {
            socket.emit("DELETE_TASK", id, responseData => {
                if (responseData.statusCode == 400) {
                    console.log(responseData.msg);
                    reject(responseData)
                }
                if (responseData.statusCode == 204) {
                    resolve(responseData)
                }
            })
        })
    },

    downloadFile(fileName){
        return new Promise((resolve, reject) => {
            socket.emit("DOWNLOAD_FILE", fileName, responseData =>{
                if (responseData.statusCode==500){
                    console.log(responseData.msg);
                    reject(responseData)
                }
                if (responseData.statusCode==200){
                    resolve(responseData.result)
                }
            })
        })
    },

    createTask(_data){
        return new Promise((resolve, reject) => {
            socket.emit("CREATE_TASK", _data, responseData => {
                if(responseData.statusCode == 201)
                    resolve(responseData.statusCode);
                else
                    reject(responseData.statusCode)
            })
        })
    },

    updateTask(data){
        return new Promise((resolve, reject) => {
            socket.emit("UPDATE_TASK", data, responseData => {
                if(responseData.statusCode == 204)
                    resolve(responseData);
                else
                    reject(responseData);
            })
        })
    },

    login(data){
        return new Promise((resolve, reject) => {            
            socket.emit("LOGIN", data, responseData => {
                console.log(responseData);
                if(responseData.statusCode == 200){
                    setCookie(responseData)
                    resolve(responseData);
                }///////  
                else
                    reject(responseData);
            })
        })
    },

    register(data){
        return new Promise((resolve, reject) => {
            socket.emit("REGISTER", data, responseData => {
                console.log(responseData);
                if(responseData.statusCode == 201){                    
                    setCookie(responseData);
                    resolve(responseData.token);
                } else if(responseData.statusCode == 401)
                    reject(responseData);
                else
                    reject();
            })
        })
    }
}

export default API;

function setCookie(data){
    var date = new Date();
    date.setTime(Date.now() + 60 * 1000); //Date.parse(data.expires) set day value to expiry
    var expires = "; expires=" + date.toGMTString();
    var setCookie = "auth" + "=" + data.token + expires + "; path=/";
    document.cookie = setCookie;
}