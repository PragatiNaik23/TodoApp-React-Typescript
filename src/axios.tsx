import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://todo-app-43720-default-rtdb.firebaseio.com', 
});

export default instance;
