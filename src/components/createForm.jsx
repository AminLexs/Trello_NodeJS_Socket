import React, { Component } from "react";
import FileEditor from "./fileEditor";
import NameEditor from "./input"
 
class Create extends Component {
    constructor(props){
        super(props);
        this.state={
            file:null,
            name:""
        }
        this._onClick = this._onClick.bind(this);
        this.onUpload=this.onUpload.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
    }

    _onClick(){
        if(!this.state.name || this.state.name.match(/\W/g)){
            alert("Allowed: latin letters, numbers and '_', length:15")
            return;
        }
        this.props.onCreate({task_name:this.state.name,text_file:this.state.file})
        this.setState({
            name:"",
            file:null
        }) 
    }

    onNameChange(target){
        this.setState({
            name: target.value
        })
    }

    onUpload(_file){
        this.setState({
            file:_file
        })
    }

    render() {
        return (
        <div className="form-group creator"> 
            <div className="row">
            <NameEditor
                _onChange={this.onNameChange}
                defValue={this.state.name}
                type={"text"}
                elName={"task_name"}
                size={"15"}
                placeholder={"Имя задачи"}
            />
            
            <FileEditor
                fl = {this.state.file}
                _onUpload={this.onUpload}
            />
            
            <button className="btn btn-primary" type="button" onClick={this._onClick}>Создать задачу</button>
            </div>

        </div>
        );
    }
}
 
export default Create;