<template>
  <v-app dark>
      <v-toolbar color="indigo">
        <v-toolbar-side-icon
          @click.stop="sideNav = !sideNav"
          class="hidden-md-and-up "></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">Habiteria</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn
            flat
            v-for="item in availableOptions"
            :key="item.title"
            :to="item.link">
            <v-icon left dark>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn class="error" v-if="isLoggedIn" @click="signOut">Sign Out</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-navigation-drawer temporary v-model="sideNav" absolute>
        <v-list>
          <v-list-tile
            v-for="item in availableOptions"
            :key="item.title"
            :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="isLoggedIn">
            <v-list-tile-action>
              <v-icon>lock</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-btn @click="signOut" class="error">Sign Out</v-btn></v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <main>
        <router-view></router-view>
      </main>
    </v-app>
</template>

<script>
  import auth from "./auth"
  import * as _ from "lodash";

  export default {
    name: 'App',
    data() {
      return {
        sideNav: false,
        menuItems: [
          {icon: 'supervisor_account', title: 'Habits', link: '/habits', auth: true},
          {icon: 'add', title: 'Create Habit', link: '/habit/new', auth: true},
          {icon: 'watch', title: 'Tracking', link: '/tracking', auth: true},
          {icon: 'person', title: 'Profile', link: '/profile', auth: true},
          {icon: 'face', title: 'Sign Up', link: '/signUp', auth: false},
          {icon: 'lock_open', title: 'Sign In', link: '/signIn', auth: false},
        ]
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn;
      },
      availableOptions: function () {
        var self = this;
        return self.menuItems.filter(function (item) {
//          console.info(item.auth);
//          console.info(self.$store.getters.isLoggedIn);
          return item.auth === self.$store.getters.isLoggedIn;
        })
      }
    },
    methods: {
      signOut: function () {
        this.$store.dispatch("logout");
      }
    }
  }
</script>

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;<div id="app">&ndash;&gt;-->
<!--&lt;!&ndash;<v-app>&ndash;&gt;-->
<!--&lt;!&ndash;<v-navigation-drawer temporary v-model="sideNav">&ndash;&gt;-->
<!--&lt;!&ndash;<v-list>&ndash;&gt;-->
<!--&lt;!&ndash;<v-list-tile>&ndash;&gt;-->
<!--&lt;!&ndash;<v-list-tile-action>&ndash;&gt;-->
<!--&lt;!&ndash;<v-icon>supervisor-account</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;</v-list-tile-action>&ndash;&gt;-->
<!--&lt;!&ndash;</v-list-tile>&ndash;&gt;-->
<!--&lt;!&ndash;</v-list>&ndash;&gt;-->
<!--&lt;!&ndash;</v-navigation-drawer>&ndash;&gt;-->
<!--&lt;!&ndash;<v-toolbar>&ndash;&gt;-->
<!--&lt;!&ndash;<v-toolbar-side-icon @click.native.stop="sideNav = !sideNav"></v-toolbar-side-icon>&ndash;&gt;-->
<!--&lt;!&ndash;<v-toolbar-title>Habiteria</v-toolbar-title>&ndash;&gt;-->
<!--&lt;!&ndash;<v-spacer></v-spacer>&ndash;&gt;-->
<!--&lt;!&ndash;<v-toolbar-items>&ndash;&gt;-->
<!--&lt;!&ndash;<v-btn flat>&ndash;&gt;-->
<!--&lt;!&ndash;<v-icon left>supervisor-account</v-icon>&ndash;&gt;-->
<!--&lt;!&ndash;Habits&ndash;&gt;-->
<!--&lt;!&ndash;</v-btn>&ndash;&gt;-->
<!--&lt;!&ndash;</v-toolbar-items>&ndash;&gt;-->
<!--&lt;!&ndash;</v-toolbar>&ndash;&gt;-->
<!--&lt;!&ndash;</v-app>&ndash;&gt;-->
<!--&lt;!&ndash;</div>&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<div class="page-container">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-app md-scrollbar>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-app-toolbar class="md-large md-dense">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<div class="md-toolbar-section-start">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-tabs md-sync-route>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-tab id="tab-home" md-label="Habiteria" to="/"></md-tab>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-tab v-if="user.authenticated" id="tab-pages" md-label="Habits" to="/habits"></md-tab>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-tab v-if="user.authenticated" id="tab-posts" md-label="Tracking" to="/tracking"></md-tab>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</md-tabs>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<div class="md-toolbar-section-end">&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-button v-if="!user.authenticated"><router-link to="signIn">Sign In</router-link></md-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-button v-if="!user.authenticated"><router-link to="signUp" >Sign Up</router-link></md-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<md-button v-if="user.authenticated" @click="signOut">Sign Out</md-button>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</md-app-toolbar>&ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;&lt;!&ndash;<md-app-content>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;<router-view/>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</md-app-content>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</md-app>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;&lt;!&ndash;</div>&ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--<script>-->
<!--import auth from './auth'-->
<!--import router from './router'-->

<!--export default {-->
<!--name: 'app',-->
<!--data() {-->
<!--return {-->
<!--sideNav: false,-->
<!--user: auth.user,-->
<!--counter: 45,-->
<!--max: 100-->
<!--}-->
<!--},-->
<!--created() {-->
<!--auth.checkAuth();-->
<!--},-->
<!--methods: {-->
<!--signOut() {-->
<!--auth.signOut();-->
<!--},-->
<!--toIndex() {-->
<!--router.push('/')-->
<!--},-->
<!--toHabits() {-->
<!--router.push('habits')-->
<!--},-->
<!--toTracking() {-->
<!--router.push('tracking')-->
<!--}-->
<!--}-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--#app {-->

<!--}-->
