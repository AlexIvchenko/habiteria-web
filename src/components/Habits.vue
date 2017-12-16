<template>
    <v-container>

      <v-layout row justify-center v-if="loading">
          <v-flex xs12 class="text-xs-center">
            <v-progress-circular
              indeterminate
              color="primary"
              :width="7"
              :size="70"
            ></v-progress-circular>
          </v-flex>
      </v-layout>

      <v-layout row wrap v-else>
        <v-flex xs12 sm8 offset-sm2 md8 offset-md2 lg6 offset-lg3>
          <v-expansion-panel popout>
            <v-expansion-panel-content v-for="habit in habits" :key="habit.name" class="mb-2" @input="onSelect(habit, $event)">
              <div slot="header">
                <h5 class="headline white--text mb-0">{{ habit.name }}</h5>
                <h6 class="subheading blue--text mb-0">{{ habit.startDate | date }}</h6>
                <v-progress-linear :value="habit.progress" height="15" :color="color(habit)"></v-progress-linear>
              </div>

              <v-layout row justify-center v-if="trackingLoading">
                <v-flex xs12 class="text-xs-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    :width="3"
                    :size="30"
                  ></v-progress-circular>
                </v-flex>
              </v-layout>

              <v-list two-line subheader v-else>
                <v-subheader inset>Tracking</v-subheader>
                <v-list-tile avatar v-for="record in habit.records" :key="record.repeat">
                  <v-list-tile-avatar>
                    <v-icon class="grey lighten-1 white--text">folder</v-icon>
                  </v-list-tile-avatar>
                  <v-list-tile-content>
                    <v-list-tile-title :class=stateClass(record)>{{ record.status }}</v-list-tile-title>
                    <v-list-tile-sub-title>{{ record.time | date }}</v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-btn flat color="green" v-if="record._links.perform" v-on:click="doPerformRecord(habit, record)">
                      <v-icon color="green lighten-1">done_all</v-icon>
                    </v-btn>
                    <v-btn flat color="red" v-if="record._links.fail" v-on:click="doFailRecord(habit, record)">
                      <v-icon color="red lighten-1">clear</v-icon>
                    </v-btn>
                    <v-btn flat color="orange" v-if="record._links.undo" v-on:click="doUndoRecord(habit, record)">
                      <v-icon color="orange lighten-1">history</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
              <v-btn flat :to="'/habits/' + habit.id">
                <v-icon left light>arrow_forward</v-icon>
                View
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'Habits',
    computed: {
      tracking() {
        return this.$store.getters.habitTracking;
      },
      habits() {
        return this.$store.getters.loadedHabits
      },
      loading() {
        return this.$store.getters.loading;
      },
      trackingLoading() {
        return this.$store.getters.trackingLoading;
      }
    },
    created() {
      this.$store.dispatch("updateHabits");
    },
    data() {
      return {
        dialog: false,
      }
    },
    methods: {
      onSelect(habit, event) {
        if (event === true) {
          console.log(habit.name);
          this.$store.dispatch("loadHabitTracking", {habit: habit});
        }
      },
      stateClass(record) {
        if (record.status === 'SUCCESS') {
          return 'green--text'
        } else if (record.status === 'FAIL') {
          return 'red--text'
        }
        return 'blue--text';
      },
      color(habit) {
        return ['error', 'warning', 'success'][Math.floor(habit.progress / 40)]
      },
      doPerformRecord: function (habit, record) {
        this.$store.dispatch("doPerformRecord", {habit: habit, record: record});
      },

      doFailRecord: function (habit, record) {
        this.$store.dispatch("doFailRecord", {habit: habit, record: record});
      },

      doUndoRecord: function (habit, record) {
        this.$store.dispatch("doUndoRecord", {habit: habit, record: record});
      }
    }
  }
</script>


