import axios from 'axios';

const endpoints = {
 development: 'https://gestorsp.herokuapp.com/',
// development: 'http://localhost:8080',
};

export const api = axios.create({
baseURL: endpoints['development'],
timeout: 20000,
headers: {"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Methods":"GET,PUT,POST,DELETE,PATCH,OPTIONS"},
});