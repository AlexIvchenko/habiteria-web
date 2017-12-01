<template>
  <div class="page-container">
    <md-app md-scrollbar>
      <md-app-toolbar class="md-large md-dense">
        <div class="md-toolbar-section-start">
          <md-tabs md-sync-route>
            <md-tab id="tab-home" md-label="Habiteria" to="/"></md-tab>
            <md-tab v-if="user.authenticated" id="tab-pages" md-label="Habits" to="/habits"></md-tab>
            <md-tab v-if="user.authenticated" id="tab-posts" md-label="Tracking" to="/tracking"></md-tab>
          </md-tabs>
        </div>
        <div class="md-toolbar-section-end">
          <md-button v-if="!user.authenticated"><router-link to="signIn">Sign In</router-link></md-button>
          <md-button v-if="!user.authenticated"><router-link to="signUp" >Sign Up</router-link></md-button>
          <md-button v-if="user.authenticated" @click="signOut">Sign Out</md-button>
        </div>
      </md-app-toolbar>

      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
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
        auth.signOut();
      }
    }
  }
</script>

<style>
  #app {

  }
</style>
