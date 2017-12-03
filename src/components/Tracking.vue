<template>
<v-container>
  <v-layout row wrap v-for="(habit, index) in orderedHabits" :key="habit.name" class="mb-2">
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
      <v-card :color="habitCardStyle(habit)" class="white--text">
        <v-card-title primary-title>
          <h5 class="headline">{{ habit.name }} #{{ habit.repeat }}</h5>
        </v-card-title>
        <v-card-text>
          <div>{{ habit.description }}</div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="green" v-if="habit._links.perform" v-on:click="doPerformHabit(habit)">Perform</v-btn>
          <v-btn flat color="red" v-if="habit._links.fail" v-on:click="doFailHabit(habit)">Fail</v-btn>
          <v-btn flat color="orange" v-if="habit._links.undo" v-on:click="doUndoHabit(habit)">Undo</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
  import api from '../api'
  import * as _ from "lodash";

  export default {
    name: 'Tracking',
    data() {
      return {
        habits: []
      }
    },
    computed: {
      orderedHabits: function () {
        return _.orderBy(this.habits, ['name', 'repeat'])
      }
    },
    created: function () {
      console.log("vue created");
      api.getActions()
        .then(function (response) {
          this.actions = response.data._links;
          this.refreshHabits();
        }.bind(this))
        .catch(function (error) {
          console.error(error);
        });
    },
    methods: {
      habitCardStyle: function (habit) {
        if (habit.status === 'FAIL') {
          return 'red darken-2'
        } else if (habit.status === 'SUCCESS') {
          return 'blue-grey darken-2'
        } else if (habit.status === 'UNVERIFIED') {
          return 'darken-2'
        }
      },
      doPerformHabit: function (habit) {
        console.log(habit);
        var performUrl = habit._links.perform.href;
        console.log("perform url: " + performUrl);
        api.post(performUrl).then(function (response) {
          this.refreshHabits();
        }.bind(this));
      },

      doFailHabit: function (habit) {
        console.log(habit);
        var failUrl = habit._links.fail.href;
        console.log("fail url: " + failUrl);
        api.post(failUrl).then(function (response) {
          this.refreshHabits();
        }.bind(this));
      },

      doUndoHabit: function (habit) {
        console.log(habit);
        var undoUrl = habit._links.undo.href;
        console.log("undo url: " + undoUrl);
        api.post(undoUrl).then(function (response) {
          this.refreshHabits();
        }.bind(this));
      },

      createGetCurrentHabitListRequest: function () {
        console.log(this.actions);
        const getCurrentHabitListUrl = this.actions.getCurrentHabitList.href;
        console.log("get current habit list url: " + getCurrentHabitListUrl);
        return api.get(getCurrentHabitListUrl);
      },

      handleGetCurrentHabitListRequest: function (response) {
        if (response.data._embedded && response.data._embedded.scheduledHabitResourceList) {
          this.habits = response.data._embedded.scheduledHabitResourceList;
          console.log(response.data._embedded);
        }
      },

      refreshHabits: function () {
        this.createGetCurrentHabitListRequest()
          .then(function (response) {
            this.handleGetCurrentHabitListRequest(response)
          }.bind(this))
          .catch(function (error) {
            console.info(error);
          })
      }
    }
  }
</script>
