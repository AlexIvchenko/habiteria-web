import router from '../router'
import axios from 'axios'

const API_URL = 'http://localhost:8888/api';

const SIGN_IN_URL = API_URL;

const SIGN_UP_URL = API_URL + '/users';

export default {
  user: {
    authenticated: false
  },

  created() {
    checkAuth();
  },

  credentials() {
    return {
      username: localStorage.getItem('username'),
      password: localStorage.getItem('password')
    }
  },

  signIn(context, credentials, redirect) {
    axios({
      url: SIGN_IN_URL,
      auth: {
        username: credentials.username,
        password: credentials.password
      }})
      .then(function (response) {
        console.log('ok');
        console.log(response.data);
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
        this.user.authenticated = true;
        if (redirect) {
          router.push(redirect);
        }
      }.bind(this))
      .catch(function (error) {
        context.errors = error.response.data;
      })
  },

  signUp(context, credentials, redirect) {
    console.log(credentials);
    axios.post(SIGN_UP_URL, credentials)
      .then(function (response) {
        localStorage.setItem('username', credentials.username);
        localStorage.setItem('password', credentials.password);
        this.user.authenticated = true;
        if (redirect) {
          console.log(redirect);
          router.push(redirect);
        }
      }.bind(this))
      .catch(function (error) {
        context.errors = error.response.data;
      })
  },

  signOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    this.user.authenticated = false;
    router.push('/signIn');
  },

  checkAuth() {
    console.log('checking auth');
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    console.log(username + ' ' + password);

    if (username && password) {
      this.signIn(null, {username: username, password: password});
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false
    }
  }
}
