import React, { Component } from "react";
import FileEditor from "./fileEditor";
import NameEditor from "./input"
import Modal from "./modal";
 
class Editor extends Component {

    constructor(props){
        super(props);
        this.state={
            _id:this.props.task._id,
            status:this.props.task.status,
            name:this.props.task.name,
            fileName:this.props.task.fileName,
            file:null,
            deathDate:null,
            prev_file:this.props.task.fileName,
            deleteFlag:false
        }
        this._onChange=this._onChange.bind(this);
        this.onDelete=this.onDelete.bind(this);
        this.onUpload=this.onUpload.bind(this);
        this.onOptionChange=this.onOptionChange.bind(this);
        this.updateTask=this.updateTask.bind(this);
        this.cancel=this.cancel.bind(this);
        this.onDeadlineChange= this.onDeadlineChange.bind(this);
    }

    cancel(){
        this.props.cancelFnc();
    }

    onDelete(){
        this.setState({
            fileName:"",
            file:null,
            deleteFlag:true
        })
    }

    _onChange(target){
        this.setState({
            name: target.value
        })
    }

    onUpload(_file){
        this.setState({
            file:_file,
            fileName:_file.name,
        })
    }

    onOptionChange(event){
        this.setState({
            status:event.target.value
        })
    }

    updateTask(){
        if(!this.state.name || this.state.name.match(/\W/g)){
            alert("Allowed: latin letters, numbers and '_', length:15")
            return;
        }
        this.props.onSaveEdit(this.state)
    }

    onDeadlineChange(event){
        var chosenDeadline= Date.parse(event.target.value);
        var birthDate = Date.parse(this.props.task.birthDate);
        if(chosenDeadline<birthDate){
            event.target.value="";
            alert("Deadline can't be lesser than start date :)")
            return;
        }
        this.setState({
            deathDate:chosenDeadline
        });
    }

    render() {
        return (
            <div className="row justify-content-center">
            <div class="col-3 bg-light border border-secondary" id="edit">

                <NameEditor
                    _onChange={this._onChange}
                    defValue={this.state.name}
                    type={"text"}
                    elName={"edit_task_name"}
                    size={"15"}
                />
                <br/><br/>
                <FileEditor 
                    fl = {this.state.fileName}
                    onDelete={this.onDelete}
                    _onUpload={this.onUpload}
                />
                <br/><br/>
                <label htmlFor="death-date">Сроки</label>
                <input className="form-control" id="death-date" type="datetime-local" name="date-selector" onChange={this.onDeadlineChange}/>
                <br/><br/>
                <select id="status-selector" onChange={this.onOptionChange} value={this.state.status}> 
                    <option id="progress" value="inProgress" >В процессе</option>
                    <option id="terminate" value="terminated">Остановлено</option>
                    <option id="suspend" value="suspended">Приостановлено</option>
                </select>
                <br/><br/>
                <button className="btn btn-primary mr-5" type="button" id="save_edit" onClick={this.updateTask}>Сохранить</button>
                <button className="btn btn-secondary mr-2" id="cancel_edit" type="button" onClick={this.cancel}>Отменить</button>

            </div>
            </div>

    );
  }
}
 
export default Editor;