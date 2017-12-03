<template>
  <v-container>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm12 md6 lg6>
        <v-layout row wrap>
          <v-flex d-flex xs12 mb-4>
            <v-card class="info">
              <v-card-title primary-title>
                <v-flex>
                  <h5 class="headline white--text mb-0">{{ habit.name }}</h5>
                  <h6 class="subheading black--text mb-0">{{ habit.date | date }}</h6>
                  <v-progress-linear :value="habit.progress" height="15" color="error"></v-progress-linear>
                </v-flex>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex d-flex v-for="rec in orderedRecords" :key="rec.repeat" xs12 mb-2>
            <v-card :color="recordCardStyle(rec)">
              <v-card-title primary-title>
                <v-flex xs12>
                  <h5 class="headline white--text mb-0">{{ rec.status }}</h5>
                  <h5 class="headline mb-0">{{ rec.time | date }}</h5>
                  <h5 class="headline mb-0">Repeat #{{ rec.repeat }}</h5>
                </v-flex>
              </v-card-title>
            </v-card>
          </v-flex>
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
    computed: {
      habit() {
        return this.$store.getters.loadedHabit(this.id);
      },
      orderedRecords: function () {
        return _.orderBy(this.calendar, ['repeat'], ['desc'])
      }
    },
    created() {
      this.getCalendar();
    },
    data() {
      return {
        calendar: [],
      }
    },
    methods: {
      recordCardStyle: function (rec) {
        if (rec.status === 'FAIL') {
          return 'red'
        } else if (rec.status === 'SUCCESS') {
          return 'green'
        } else if (rec.status === 'UNVERIFIED') {
          return 'white'
        }
      },
      getCalendar() {
        const habit = this.$store.getters.loadedHabit(this.id);
        const url = habit._links.getCalendar.href;
        api.get(url)
          .then(function (response) {
            this.calendar = response.data.records;
          }.bind(this))
          .catch(function (error) {
            console.error(error);
          })
      }
    }
  }
</script>
