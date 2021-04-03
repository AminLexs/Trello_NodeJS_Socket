import Dispatcher from "../dispatcher/dispatcher";
import actionTypes from "./types";
import download from 'js-file-download';
import API from "../api/api";
import { socket } from "../components/root";

var cookie = require('cookie');

const TaskActions = {
    getTasks(status) {
        API.getTasks(status)
        .then(data => {
            Dispatcher.dispatch({
                type: actionTypes.REQUEST_SUCCESS,
                tasks: data
            })
        })
        .catch(error => {
            console.log(error);
        });
    },

    deleteTask(_id){
        checkCookie();
        API.deleteTask(_id)
            .then(data => {
                this.getTasks("");
            })
            .catch(error => {
                console.log(error);
            })
    },

    downloadFile(fileName){
        checkCookie();
        API.downloadFile(fileName)
            .then(data => {
                download(data, fileName);
            })
            .catch(error => {
                console.log(error);
            })
    },
    
    createTask(_data){
        checkCookie();
        if(_data.text_file)
            _data.filename = _data.text_file.name;
        API.createTask(_data)
            .then(res => { 
                this.getTasks("");
            })
    },

    updateTask(data){
        checkCookie();
        this.clearEditingTask();
        let sendData = { 
            id : data._id,
            text_file : data.file,
            name : data.name,
            deathDate : new Date(data.deathDate),
            status : data.status
        };

        if (data.prev_file)
            sendData.prev_file = data.prev_file;
            
        if (data.deleteFlag)
            sendData.deleteFlag = data.deleteFlag;

        if(data.file)
            sendData.filename = data.file.name;
        console.log(sendData);
        API.updateTask(sendData)
            .then(() => {
                console.log("uuuu");
                this.getTasks("");
            })
    },

    choseTaskFromTable(task) {
        Dispatcher.dispatch({
            type: actionTypes.CHOOSE_TASK,
            editingTask: task
        });
    },

    clearEditingTask() {
        Dispatcher.dispatch({
            type: actionTypes.CLEAR_TASK,
        });
    }
}

export default TaskActions;

function checkCookie(){
    if (socket.io.engine.opts.transportOptions.polling.extraHeaders.user_cookie!==document.cookie){
        socket.disconnect().connect();
    }
    
}