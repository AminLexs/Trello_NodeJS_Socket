import React, { Component } from "react";

class GetParams extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task_status: ""
        };
        this.radioButtonChange=this.radioButtonChange.bind(this)
    }

    radioButtonChange(event){
        this.props.onFiltering(event.target.value)
    }

    render() {
        return (
        <div className="from-group filter" onChange={this.radioButtonChange}>
            <label className="radio-inline mr-3">
                <input type="radio" name="task_status" value=''/> Все
            </label>
            <label className="radio-inline mr-3">
                <input type="radio" name="task_status" value='inProgress'/> В процессе
            </label>    
            <label className="radio-inline mr-3">
                <input type="radio" name="task_status" value='terminated'/> Остановлены
            </label> 
            <label className="radio-inline mr-3">
                <input type="radio" name="task_status" value='suspended'/> Приостановлены
            </label> 

            
        </div>
    );
  }
}
export default GetParams;

/* 
<input className="form-control" type="radio" name="task_status" id="in-progress" value="inProgress"/>
            <label htmlFor="in-progress"  className="mr-5"> In Progress</label>
            <input className="form-control" type="radio" name="task_status" id="terminated" value="terminated"/>
            <label htmlFor="terminated" className="mr-5">Terminated</label>
            <input className="form-control" type="radio" name="task_status" id="suspended" value="suspended"/>
            <label htmlFor="suspended" className="mr-5"> Suspended</label>
            <input className="form-control" type="radio" name="task_status" id="all" value=""/>
            <label htmlFor="all">All</label>
 */