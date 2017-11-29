<template>
  <div id="app">
    <b-navbar toggleable="md" class="navbar navbar-expand-lg navbar-dark bg-dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">Habiteria</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <!-- Left aligned nav items -->
        <b-navbar-nav>
          <b-nav-item to="habits" v-if="user.authenticated">Habits</b-nav-item>
          <b-nav-item to="tracking" v-if="user.authenticated">Tracking</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item>
              <router-link class="nav-link" to="signIn" v-if="!user.authenticated">Sign In</router-link>
            </b-nav-item>
            <b-nav-item><a class="nav-link disabled" href="#" v-if="!user.authenticated">or</a></b-nav-item>
            <b-nav-item>
              <router-link class="nav-link" to="signUp" v-if="!user.authenticated">Sign Up</router-link>
            </b-nav-item>
            <b-nav-item><a class="nav-link" href="#" v-if="user.authenticated" v-on:click="signOut">Sign Out</a>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <b-progress class="mt-1" :max="max" show-value>
      <b-progress-bar :value="counter*(6/10)" variant="success"></b-progress-bar>
      <b-progress-bar :value="counter*(2.5/10)" variant="warning"></b-progress-bar>
      <b-progress-bar :value="counter*(1.5/10)" variant="danger"></b-progress-bar>
    </b-progress>
    <b-btn class="mt-4" @click="clicked">Click me</b-btn>

    <router-view/>
  </div>
</template>

<script>
  import auth from './auth'

  export default {
    name: 'app',
    data() {
      return {
        user: auth.user,
        counter: 45,
        max: 100
      }
    },
    created() {
      auth.checkAuth();
    },
    methods: {
      signOut() {
        auth.signOut()
      },
      clicked() {
        this.counter = Math.random() * this.max
        console.log('Change progress to ' +
          Math.round(this.counter * 100) / 100)
      }
    }
  }
</script>

<style>

  #app {
  }
</style>
