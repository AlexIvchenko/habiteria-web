import axios from 'axios'
// import {store} from '../store'

const API_URL = process.env.API_URL;

export default {
  getActions() {
    console.log({env: process.env.NODE_ENV});
    console.log({api: API_URL});
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
  },

  put(url, data) {
    const auth = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    if (auth.username && auth.password) {
      return axios({
        url: url,
        method: 'put',
        data: data,
        auth: auth
      })
    } else {
      return axios.put(url, data);
    }
  },

  patch(url, data) {
    const auth = {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    };
    if (auth.username && auth.password) {
      return axios({
        url: url,
        method: 'patch',
        data: data,
        auth: auth
      })
    } else {
      return axios.patch(url, data);
    }
  }
}
