var taskController = require("../controllers/taskController.js");

var addListenersForTaksRequests = function(socket){
    taskController.getTasks(socket);
    taskController.deleteTask(socket);
    taskController.downloadFile(socket);
    taskController.createTask(socket);
    taskController.updateTask(socket);
}

module.exports = {
    TASK_LISTENERS : addListenersForTaksRequests
}
