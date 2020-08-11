import axios from 'axios';

const endpoints = {
    //develoment: 'http://localhost:8080'
    develoment: 'https://pure-ocean-52699.herokuapp.com'
};

export const api = axios.create({
    baseURL: endpoints['develoment'],
    timeout: 20000,
    headers: {"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"}
});

//"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"