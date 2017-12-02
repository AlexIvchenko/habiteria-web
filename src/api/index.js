import axios from 'axios'
import auth from '../auth'


var actions = {};
const API_URL = 'http://localhost:8888/api/';

export default {
  loadActions() {
    console.log('load actions ' + this.api);
    axios.get(this.api).then(function (response) {
      actions = response.data._links;
    }.bind(this));
  },

  getActions() {
    return this.get(API_URL);
  },

  get(url) {
    if (auth.user.authenticated) {
      return axios({
        url: url,
        method: 'get',
        auth: {
          username: auth.credentials().username,
          password: auth.credentials().password
        }
      })
    } else {
      return axios.get(url);
    }
  },

  post(url, data) {
    if (auth.user.authenticated) {
      return axios({
        url: url,
        method: 'post',
        data: data,
        auth: {
          username: auth.credentials().username,
          password: auth.credentials().password
        }
      })
    } else {
      return axios.get(url);
    }
  },


  canSignUp() {
    return this.actions.signUp !== null;
  }
}
