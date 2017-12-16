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
      <v-flex d-flex xs12 sm12 md6 lg6>
        <v-layout row wrap>
          <v-flex d-flex xs12 mb-4>
            <v-card>
              <v-card-title primary-title>
                <h5 class="headline white--text mb-0">{{ habit.name }}</h5>
                <template v-if="true">
                  <v-spacer></v-spacer>
                  <app-edit-habit-details-dialog :habit="habit"></app-edit-habit-details-dialog>
                </template>
              </v-card-title>
              <v-card-text>
                <h6 class="subheading white--text mb-0">{{ habit.description }}</h6>
                <h6 class="subheading blue--text mb-0">{{ habit.startDate | date }}</h6>
                <v-progress-linear :value="habit.progress" height="15" :color="color(habit)"></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-btn @click="getCalendar()">Show</v-btn>
          <div v-if="showCalendar">
            <v-flex d-flex v-for="rec in orderedRecords" :key="rec.repeat" xs12 mb-2>
              <v-card :color="recordCardStyle(rec)">
                <v-card-title primary-title>
                  <v-flex xs12>
                    <h5 class="headline mb-0">Repeat #{{ rec.repeat }} - {{ rec.status }} ({{ rec.time | date }})</h5>
                  </v-flex>
                </v-card-title>
              </v-card>
            </v-flex>
          </div>

        </v-layout>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import api from '../api'
  import * as _ from "lodash";

  export default {
    props: ['id'],
//    mounted() {
//      this.$store.dispatch("updateHabitsIfEmpty");
//    },
    data() {
      return {
        showCalendar: false,
        calendar: [],
      }
    },
    computed: {
      habit() {
        return this.$store.getters.loadedHabit(this.id);
      },
      orderedRecords: function () {
        console.log(this.id);
        const habit = this.$store.getters.loadedHabit(this.id);
        console.log(habit);
        return _.orderBy(this.$store.getters.records(habit), ['repeat'], ['desc'])
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    created() {
      this.$store.dispatch("updateHabitsIfEmpty");
    },
    methods: {
      color(habit) {
        return ['error', 'warning', 'success'][Math.floor(habit.progress / 40)]
      },
      recordCardStyle: function (rec) {
        if (rec.status === 'FAIL') {
          return 'red darken-3'
        } else if (rec.status === 'SUCCESS') {
          return 'green darken-3'
        } else if (rec.status === 'UNVERIFIED') {
          return 'grey darken-3'
        }
      },
      getCalendar() {
        if (!this.showCalendar) {
          console.log(this.id);
          const habit = this.$store.getters.loadedHabit(this.id);
          this.$store.dispatch('loadCalendar', {habit: habit});
        }
        this.showCalendar = ! this.showCalendar;
      }
    }
  }
</script>
