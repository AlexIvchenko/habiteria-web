import Vue from 'vue'
import Vuex from 'vuex'
import habit from './habit'
import user from './user'
import shared from './shared'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    habit: habit,
    user: user,
    shared: shared
  }
});
