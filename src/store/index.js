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

    trackingLoading: false,

    loadedHabits: [],

    loadedCurrentHabits: [],

    user: null
  },
  mutations: {
    loadCalendar(state, payload) {
      payload.habit.records = payload.records;
    },

    loadHabitTracking(state, payload) {
      console.log(payload);
      const habit = state.loadedHabits.find(h => {
        return h._links.self.href === payload.habit._links.self.href;
      });
      habit.records = payload.records;
    },

    updateHabitDetails(state, payload) {
      console.log(payload);
      const habit = state.loadedHabits.find(h => {
        return h._links.self.href === payload._links.self.href;
      });
      habit.name = payload.name;
      habit.description = payload.description;
      habit._links = payload._links;
    },
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
    clearHabits(state) {
      state.loadedHabits = []
    },
    setLoadedHabits(state, payload) {
      state.loadedHabits = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },

    setTrackingLoading(state, payload) {
      state.trackingLoading = payload;
    },
    updateHabit(state, payload) {
      console.log(payload);

      const habit = state.loadedHabits.find(h => {
        return h._links.self.href === payload.habit._links.self.href;
      });
      const record = habit.records.find(r => {
        return r._links.self.href === payload.record._links.self.href;
      });
      record.status = payload.record.status;
      record._links = payload.record._links;
    }
  },
  actions: {
    loadCalendar({commit}, payload) {
      commit("setLoading", true);
      const url = payload.habit._links.getCalendar.href;
      api.get(url)
        .then(function (response) {
          const calendar = response.data.records;
          commit('loadCalendar', {habit: payload.habit, records: calendar});
          commit("setLoading", false);
        }.bind(this))
        .catch(function (error) {
          console.error(error);
          commit("setLoading", false);
        })
    },

    updateHabitDetails({commit}, payload) {
      console.log("update habit hetails");
      console.log(payload);
      commit('setLoading', true);
      const updated = {};
      if (payload.name) {
        updated.name = payload.name;
      }
      if (payload.description !== null && payload.description !== undefined) {
        updated.description = payload.description;
      }
      const habit = payload.habit;
      let url = habit._links.update.href;
      console.log(url);
      api.patch(url, updated)
        .then(response => {
          commit('updateHabitDetails', response.data);
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          commit('setError', error.data.response)
        })
    },

    clearError({commit}) {
      commit('clearError');
    },

    doPerformRecord: function ({commit}, payload) {
      const habit = payload.habit;
      const record = payload.record;
      console.log(habit);
      console.log(record);
      var performUrl = record._links.perform.href;
      console.log("perform url: " + performUrl);
      api.post(performUrl).then(function (response) {
        commit("updateHabit", {habit: habit, record: response.data});
      }.bind(this));
    },

    doFailRecord: function ({commit}, payload) {
      const habit = payload.habit;
      const record = payload.record;
      console.log(habit);
      console.log(record);
      var failUrl = record._links.fail.href;
      console.log("fail url: " + failUrl);
      api.post(failUrl).then(function (response) {
        commit("updateHabit", {habit: habit, record: response.data});
      }.bind(this));
    },

    doUndoRecord: function ({commit}, payload) {
      const habit = payload.habit;
      const record = payload.record;
      console.log(habit);
      console.log(record);
      var undoUrl = record._links.undo.href;
      console.log("undo url: " + undoUrl);
      api.post(undoUrl).then(function (response) {
        commit("updateHabit", {habit: habit, record: response.data});
      }.bind(this));
    },

    updateHabitsIfEmpty({dispatch, commit, state}) {
      console.log('updateHabitsIfEmpty');
      if (state.loadedHabits === null || state.loadedHabits === undefined || state.loadedHabits.length === 0) {
        console.log('need to update habits');
        dispatch('updateHabits');
      }
    },

    loadHabitTracking({commit, state}, payload) {
      commit('setTrackingLoading', true);
      const url = payload.habit._links.getTracking.href;
      api.get(url).then(response => {
        const records = response.data._embedded.calendarRecordResourceList;
        if (records.length > 0) {
          const habit = state.loadedHabits.find(h => {
            return h._links.self.href === records[0]._links.getHabit.href;
          });
          commit('loadHabitTracking', {habit: habit, records: records});
          commit('setTrackingLoading', false);
        }
      })
    },

    updateHabits({commit}) {
      console.log('updateHabits');
      commit("clearHabits");
      commit("setLoading", true);
      api.getActions().then(response => {
        console.log(response.data._links);
        return api.get(response.data._links.getHabits.href)
      }).then(response => {
        if (response.data._embedded && response.data._embedded.habitResourceList) {
          const habits = response.data._embedded.habitResourceList;
          for (let i = 0; i < habits.length; ++i) {
            habits[i].records = [];
          }
          commit("setLoadedHabits", habits);
          commit("setLoading", false);
        } else {
          commit("setLoadedHabits", []);
          commit("setLoading", false);
        }
      }).catch(error => {
        console.error(error);
        commit("setError", error.data.response);
        commit("setLoading", false);
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
    },

    updateHabitToTrack({commit}, habit) {
      commit('setLoading', true);
      const url = habit._links.getTracking.href;
      api.get(url)
        .then(res => {
          commit('setHabitTrackingRecords', res.data);
          console.log(res.data);
          commit('setLoading', false);
        })
        .catch(error => {
          commit("setError", error.response.data);
          commit('setLoading', false);
        })
    }
  },
  getters: {
    records(state) {
      return habit => {
        const found = state.loadedHabits.find(h => {
          return h.id === habit.id
        });
        return found.records;
      }
    },

    habitTracking(state) {
      return state.habitTrackingRecords;
    },

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
      return (id) => {
        const habit = state.loadedHabits.find(h => {
          return h.id === parseInt(id);
        });
        console.log(habit);
        return habit;
      }
    },

    loading(state) {
      return state.loading;
    },

    trackingLoading(state) {
      return state.trackingLoading;
    },

    error(state) {
      return state.error;
    }
  }
});
