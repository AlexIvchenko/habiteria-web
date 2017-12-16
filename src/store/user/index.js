import axios from 'axios'
import api from '../../api'

const API_URL = process.env.API_URL;
const SIGN_IN_URL = API_URL;
const SIGN_UP_URL = API_URL + 'users';

export default {
  state: {
    isLoggedIn: !!localStorage.getItem("username"),
    user: null
  },
  mutations: {
    login(state) {
      state.pending = true;
    },
    loginSuccess(state, payload) {
      state.isLoggedIn = true;
      state.pending = false;
      state.user = payload;
    },
    logout(state) {
      state.loadedHabits = [];
      state.loadedCurrentHabits = [];
      state.isLoggedIn = false;
      state.user = null;
    }
  },
  actions: {
    login({commit}, creds) {
      commit("clearError");
      commit("login");
      axios({
        url: SIGN_IN_URL,
        auth: {
          username: creds.username,
          password: creds.password
        }
      })
        .then(function (response) {
          console.log('ok');
          console.log(response.data);
          localStorage.setItem('username', creds.username);
          localStorage.setItem('password', creds.password);
          commit("loginSuccess", {username: creds.username, password: creds.password});
        })
        .catch(function (error) {
          commit("setError", error.response.data)
        });
    },
    signUp({commit}, creds) {
      console.log(creds);
      api.post(SIGN_UP_URL, creds)
        .then(response => {
          localStorage.setItem('username', creds.username);
          localStorage.setItem('password', creds.password);
          commit("loginSuccess", {username: creds.username, password: creds.password});
        })
        .catch(function (error) {
          commit("setError", error.response.data);
        });
    },
    logout({commit}) {
      console.log("logout");
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      commit("logout");
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },

    auth: state => {
      return {
        username: localStorage.getItem('username'),
        password: localStorage.getItem('password')
      }
    },

    user: state => {
      return state.user;
    }
  }
};
