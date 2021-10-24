import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-cbf18.firebaseio.com/'
});

export default instance;