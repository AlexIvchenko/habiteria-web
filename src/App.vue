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
