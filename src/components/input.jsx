import React, { Component } from "react";

class NameEditor extends Component{

    onChange(event){
        this.props._onChange(event.target)
    }

    render(){
        let pl = this.props.placeholder ? this.props.placeholder : "";
        var nameEdit = <input className="form-control mb-1" placeholder={pl} type={this.props.type} name={this.props.elName} size={this.props.size} onChange ={this.onChange.bind(this)} value={this.props.defValue}/>;
        return(
            <div>
                {nameEdit}
            </div>
        )
    }
}

export default NameEditor;