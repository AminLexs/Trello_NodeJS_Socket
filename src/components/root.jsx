import React, { Component } from "react";
import Table from "./table"
import Editor from "./editor"
import Filter from "./filter"
import CreateForm from "./createForm"
import Store from "../store/taskStore"
import NavBar from "./navBar"
import Modal from "./modal"
import socketIOClient from "socket.io-client";

import TaskAction from "../action/taskAction"

var socket;

class Root extends Component {

  constructor(props) {
    const info = getStateFromFlux();
    super(props)
    this.state = {
      tasks: info.tasks,
      editingTask: info.editingTask,
      isLoginModalOpen: false,
      isRegisterModalOpen: false
    }
    this._onChange = this._onChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.error = this.error.bind(this);
  }

  //componentWillRe

  componentWillMount() {
    const options = {
      transportOptions: {
        polling: {
          extraHeaders: {
            'user_cookie': document.cookie
          }
        }
      },
      withCredentials: true
    }
    socket = socketIOClient('http://localhost:8082', options);
    socket.on('connection', data => {

      console.log(data);
    });
    socket.on("auth_error", err => {
      console.log(err.statusCode);
      console.log(err.message);
      if (err.statusCode == 401)
        alert(err.message);
    });
    TaskAction.getTasks("");
  }

  componentDidMount() {
    Store.addChangeListener(this._onChange, this.error);
    Store.emitChange();
  }

  componentWillUnmount() {
    Store.removeChangeListener(this._onChange, this.error);
  }

  _onChange() {
    this.setState(getStateFromFlux());
  }

  error() {
    let err = Store.getError();
    if (err && err.status === 401) {
      this.setState({ isOpenModal: true })
    }
  }

  handleGettingTasks(status) {
    TaskAction.getTasks(status);
  }

  handleDeleting(id) {
    TaskAction.deleteTask(id)
  }

  handleCreating(data) {
    TaskAction.createTask(data);
  }

  handleEditing(taskData) {
    TaskAction.updateTask(taskData);
  }

  handleChoosingTaskFromTable(task) {
    TaskAction.choseTaskFromTable(task);
  }

  cancleEditing() {
    TaskAction.clearEditingTask();
  }

  openModal() {
    this.setState({ isOpenModal: true })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  closeModal() {
    this.setState({ isOpenModal: false })
  }

  handleFileDownload(fileName) {
    TaskAction.downloadFile(fileName)
  }

  render() {
    var editor;
    if (this.state.editingTask)
      editor = <Editor task={this.state.editingTask} cancelFnc={this.cancleEditing} onSaveEdit={this.handleEditing} />
    return (
      <div>
        <Modal
          isOpen={this.state.isOpenModal}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Login"
          closeModal={this.closeModal}
          appElement={document.getElementById('root')}
        >
        </Modal>

        <NavBar
          login={this.openModal}
        />

        <CreateForm
          onCreate={this.handleCreating}
        />
        {editor}
        <Filter
          onFiltering={this.handleGettingTasks}
        />

        <Table
          data={this.state.tasks}
          onDelete={this.handleDeleting}
          onEditClick={this.handleChoosingTaskFromTable}
          onDownload={this.handleFileDownload}
        />

      </div>
    );
  }
}

function getStateFromFlux() {
  return {
    tasks: Store.getTasks(),
    editingTask: Store.isEditing()
  };
}

export { Root, socket };
