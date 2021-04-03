import React, { Component } from "react";
import AccountAction from "../action/accountAction"

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task_status: ""
        };
    }

    logout(){
        AccountAction.logout();
    }

    render() {
        return (
        <div> 
            <nav className="navbar navbar-expand-lg navbar-dark bg-warning ">
                <p className="navbar-brand">Trello 2.0</p>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="d-flex">
                    <button className="btn btn-primary mr-2" type="button" onClick={this.props.login}>Войти</button>
                    <button className="btn btn-secondary" type="button" onClick={this.logout}>Выйти</button>
                </div>
            </nav>
        </div>
    );
  }
}
export default NavBar;