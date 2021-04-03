import React, { Component } from "react";

class FileEditor extends Component{

    onUpload(event){
        console.log(event.target.files[0]);
        this.props._onUpload(event.target.files[0])
    }

    render(){
        var fileEdit;
        if(this.props.fl)
            fileEdit = <button className="btn btn-danger" type="button" onClick={this.props.onDelete}>Delete file</button>;
        else
            fileEdit=<label className="custom-file-upload btn btn-outline-secondary"><input type="file" onInput={this.onUpload.bind(this)} name="text_file" size="50" accept=".txt"/>Upload File</label>
            /*<input class="form-control" id="text_file" type="file" name="text_file" size="50" accept=".txt" onInput={this.onUpload.bind(this)}/>;*/
        return(
            <div>
                {fileEdit}
            </div>
        )
    }
}

export default FileEditor;