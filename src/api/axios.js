import axios from 'axios';

export function setAccessToken (axios, accessToken) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
}

export default axios.create({
    baseURL: 'http://localhost:3000'
});
