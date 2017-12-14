import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import api from '../api'

Vue.use(Vuex);

const API_URL = process.env.API_URL;
const SIGN_IN_URL = API_URL;
const SIGN_UP_URL = API_URL + 'users';

export const store = new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem("username"),

    error: null,

    loading: false,

    loadedHabits: [],

    loadedCurrentHabits: [],

    user: null
  },
  mutations: {
    createHabit(state, payload) {
      state.loadedHabits.push(payload);
    },
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
    },
    setError(state, payload) {
      console.log(payload);
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    setLoadedHabits(state, payload) {
      state.loadedHabits = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    }
  },
  actions: {
    clearError({commit}) {
      commit('clearError');
    },

    updateHabits({commit}) {
      commit("setLoading", true);
      api.getActions().then(response => {
        console.log(response.data._links);
        return api.get(response.data._links.getHabits.href)
      }).then(response => {
        if (response.data._embedded && response.data._embedded.habitResourceList) {
          console.info(response.data._embedded.habitResourceList);
          commit("setLoadedHabits", response.data._embedded.habitResourceList);
        } else {
          commit("setLoadedHabits", []);
        }
        commit("setLoading", false);
      }).catch(error => {
        console.error(error);
        commit("setLoading", false);
        commit("setError", error.data.response)
      })
    },

    createHabit({commit}, payload) {
      commit("setLoading", true);
      api.getActions().then(response => {
        const url = response.data._links.createHabit.href;
        console.log(url);
        return api.post(url, payload);
      }).then(response => {
        console.log(response.data);
        commit("createHabit", payload);
        commit("setLoading", false);
      }).catch(error => {
        commit("setError", error.data.response);
        commit("setLoading", false);
      });
    },

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
    },

    loadedHabits(state) {
      return state.loadedHabits.sort((habitA, habitB) => {
        return habitA.name > habitB.date;
      })
    },

    loadedHabit(state) {
      return (name) => {
        return state.loadedHabits.find((habit) => {
          return habit.name === name;
        })
      }
    },

    loading(state) {
      return state.loading;
    },

    error(state) {
      return state.error;
    }
  }
});
