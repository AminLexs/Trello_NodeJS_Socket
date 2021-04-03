import React, { Component } from "react";
import _Modal from 'react-modal'
import AccountAction from "../action/accountAction"
import Input from "./input"

class Modal extends Component {
    constructor(props){
        super(props);
        this.state = {
            login: "",
            password: ""
        }
        this.onChange = this.onChange.bind(this);
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
    }

    async login(){
        let result = await AccountAction.login({login : this.state.login, password : this.state.password});
        if(!result){
            alert("invalid login or password")
        }else{
            this.props.closeModal();
        }
    }

    async register(){
        let res = await AccountAction
            .register(this.state.login,this.state.password);
        if(!res){
            alert("Login already exists")
        }else{
            this.props.closeModal();
        }
    }

    onChange(target){
        switch(target.name){
            case "password":
                this.setState({password : target.value});
                break;
            case "login":
                this.setState({login : target.value});
                break;            
        }
    }

    render() {
        return (
            <_Modal
                isOpen={this.props.isOpen}
                onAfterOpen={this.props.onAfterOpen}
                onRequestClose={this.props.onRequestClose}
                contentLabel={this.props.contentLabel}
                appElement={this.props.appElement}
                className="Modal"
                overlayClassName="Overlay"
            >
                
                    <form className="form-group">
                            <Input
                            _onChange={this.onChange}
                            defValue={this.state.login}
                            type={"text"}
                            elName={"login"}
                            size={"10"}
                            placeholder={"Логин"}
                        />
                        <Input
                            _onChange={this.onChange}
                            defValue={this.state.password}
                            type={"password"}
                            elName={"password"}
                            size={"8"}
                            placeholder={"Пароль"}
                        />     
                        <div class="log-reg-btn">
                            <button type="button" class="btn btn-secondary btn-sm" onClick={this.props.closeModal}>Назад</button>
                            <button type="button" class="btn btn-primary btn-sm" onClick={this.login}>Войти</button>
                            <button type="button" class="btn btn-primary btn-sm" onClick={this.register}>Зарегистрировать</button>
                        </div>            
                    </form>                           
               
            </_Modal>
        );
    }
}
 
export default Modal;