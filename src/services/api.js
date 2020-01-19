import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.51:3333', //isso pra quem ta rodando no celular e a porta é a do node
    //se for emulador, vai de localhost:3333 ou 10.0.2.2 
});

export default api;