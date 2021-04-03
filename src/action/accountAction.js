import { socket } from "../components/root";
import API from "../api/api";

const AccountAction = {

    login(data){
        return API.login(data)
            .then(responseData => {                
                socket.disconnect().connect();
                return 200;
            })
            .catch(error => {
                console.log(error);
            })
    },

    logout(){
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";                
        socket.disconnect().connect();
    },

    register(_login, _password){
        return API.register({login : _login, password : _password})
            .then(data => {
                socket.disconnect().connect();
                return 201;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

export default AccountAction;
