<template>
    <v-container>
      <v-layout row wrap v-for="habit in habits" :key="habit.name" class="mb-2">
        <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
          <v-card>
            <v-container fluid>
              <v-card-title primary-title>
                <v-flex>
                  <h5 class="headline white--text mb-0">{{ habit.name }}</h5>
                  <h6 class="subheading blue--text mb-0">{{ habit.startDate | date }}</h6>
                  <v-progress-linear :value="habit.progress" height="15" :color="color(habit)"></v-progress-linear>
                </v-flex>
              </v-card-title>
              <v-card-actions>
                <v-btn flat :to="'/habits/' + habit.name">
                  <v-icon left light>arrow_forward</v-icon>
                  View Habit
                </v-btn>
              </v-card-actions>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>
</template>

<script>
  export default {
    name: 'Habits',
    computed: {
      habits() {
        return this.$store.getters.loadedHabits
      }
    },
    created() {
      this.$store.dispatch("updateHabits");
    },
    data() {
      return {
        search: ''
      }
    },
    methods: {
      color(habit) {
        return ['error', 'warning', 'success'][Math.floor(habit.progress / 40)]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>


