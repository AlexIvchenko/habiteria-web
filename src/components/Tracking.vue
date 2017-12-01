<template>
  <div>
    <md-card v-for="(habit, index) in orderedHabits" :key="habit.name" md-with-hover
             class="md-primary"
             :md-theme="habitCardStyle(habit)">
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ habit.name }}</div>
          <div class="md-subhead">{{ habit.description }}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button v-if="habit._links.perform" v-on:click="doPerformHabit(habit)">Perform</md-button>
        <md-button v-if="habit._links.fail" v-on:click="doFailHabit(habit)">Fail</md-button>
        <md-button v-if="habit._links.undo" v-on:click="doUndoHabit(habit)">Undo</md-button>
      </md-card-actions>
    </md-card>
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
      habitCardStyle: function (habit) {
        if (habit.status === 'FAIL') {
          return 'red-card'
        } else if (habit.status === 'SUCCESS') {
          return 'green-card'
        } else if (habit.status === 'UNVERIFIED') {
          return 'white-card'
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

<style lang="scss" scoped>
  @import "~vue-material/dist/theme/engine";

  @include md-register-theme("green-card", (
    primary: md-get-palette-color(green, 500)
  ));

  @include md-register-theme("white-card", (
    primary: md-get-palette-color(white, 500)
  ));

  @include md-register-theme("red-card", (
    primary: md-get-palette-color(red, 500)
  ));

  @include md-register-theme("orange-card", (
    primary: md-get-palette-color(orange, 500)
  ));

  @import "~vue-material/dist/base/theme";
  @import "~vue-material/dist/components/MdCard/theme";

  .md-card {
    width: 200px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
</style>
