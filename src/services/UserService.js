
import axios from 'axios';

const USER_REST_API_URL = 'localhost:8080/api/personas/all';


class UserService{
    getUser(){
       return  axios.get(USER_REST_API_URL);
    }
}

export default new UserService();
