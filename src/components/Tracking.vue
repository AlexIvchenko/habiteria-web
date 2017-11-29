<template>
  <div>
    <b-card-group columns>
      <b-card v-for="(habit, index) in orderedHabits" :key="habit.name"
              :bg-variant="habitCardStyle(habit)"
              text-variant="white"
              :header="habit.name"
              class="text-center">
        <p class="card-text">Name: {{ habit.required }}</p>
        <p class="card-text">Repeat: {{ habit.repeat }}</p>
        <b-btn class="btn btn-primary" v-if="habit._links.perform" v-on:click="doPerformHabit(habit)">Perform
        </b-btn>
        <b-btn class="btn btn-danger" v-if="habit._links.fail" v-on:click="doFailHabit(habit)">Fail</b-btn>
        <b-btn class="btn btn-warning" v-if="habit._links.undo" v-on:click="doUndoHabit(habit)">Undo</b-btn>
      </b-card>
    </b-card-group>
  </div>
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
      habitCardStyle: function(habit) {
        if (habit.status === 'FAIL') {
          return 'danger'
        } else if (habit.status === 'SUCCESS') {
          return 'success'
        } else if (habit.status === 'UNVERIFIED') {
          if (habit.required) {
            return 'primary'
          } else {
            return 'warning'
          }
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
        this.habits = response.data._embedded.scheduledHabitResourceList;
        console.log(response.data._embedded);
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
