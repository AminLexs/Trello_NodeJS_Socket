import { EventEmitter } from "events";
import dispatcher from "../dispatcher/dispatcher";
import actionTypes from "../action/types";

const CHANGE_EVENT = "change";
const ERROR_EVENT = "error";
let _tasks = [];
let editingTask = null;
let errorStatus = 0;
let errorText = '';

function formatTask(task) {
    return {
        _id: task._id,
        name: task.name,
        birthDate: task.birthDate,
        deathDate: task.deathDate,
        status: task.status,
        fileName:task.fileName
    }
}

class Store extends EventEmitter {
    addChangeListener(taskRerender, errorCallback) {
        this.on(CHANGE_EVENT, taskRerender);
        this.on(ERROR_EVENT, errorCallback);
    }

    removeChangeListener(taskRerender, errorCallback) {
        this.removeListener(CHANGE_EVENT, taskRerender);
        this.removeListener(ERROR_EVENT, errorCallback);
    }

    emitChange(event) {
        if(!event)
            this.emit(CHANGE_EVENT);
        else
            this.emit(event);
    }

    getTasks() {
        return _tasks;
    }

    getError(){
        return {
            status : errorStatus,
            text : errorText
        }
    }

    isEditing(){
        return editingTask;
    }
}

const store = new Store();

dispatcher.register((action) => {
    switch (action.type) {
        case actionTypes.ERROR:
            errorStatus = action.error.status;
            errorText = action.error.data;
            store.emitChange(ERROR_EVENT);
            break;
        case actionTypes.REQUEST_SUCCESS: 
            _tasks = action.tasks.map(formatTask);
            store.emitChange(CHANGE_EVENT);
            break;
        case actionTypes.CHOOSE_TASK:
            editingTask = formatTask(action.editingTask);
            store.emitChange(CHANGE_EVENT);
            break;  
        case actionTypes.CLEAR_TASK:
            editingTask = null;
            store.emitChange(CHANGE_EVENT);
            break;
        default:
            console.log("no action")
    }
});

export default store;
