import axios from 'axios'
// import {store} from '../store'

const API_URL = 'http://localhost:8888/api/';

export default {
  getActions() {
    return this.get(API_URL);
  },

  get(url) {
    const auth = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    if (auth.username && auth.password) {
      console.info({auth: auth});
      return axios({
        url: url,
        method: 'get',
        auth: auth
      })
    } else {
      return axios.get(url);
    }
  },

  post(url, data) {
    const auth = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    if (auth.username && auth.password) {
      return axios({
        url: url,
        method: 'post',
        data: data,
        auth: auth
      })
    } else {
      return axios.post(url, data);
    }
  }
}
