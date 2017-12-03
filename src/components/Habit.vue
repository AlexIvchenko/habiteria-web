<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm12 md10 offset-md1 lg8 offset-lg2>
        <v-card class="info">
          <v-container fluid>
            <v-card-title primary-title>
              <v-flex>
                <h5 class="headline white--text mb-0">{{ habit.name }}</h5>
                <h6 class="subheading black--text mb-0">23th november 2017</h6>
                <v-progress-linear :value="habit.progress" height="15" color="error"></v-progress-linear>
              </v-flex>
            </v-card-title>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      habit() {
        return this.$store.getters.loadedHabit(this.id);
      }
    }
  }
</script>
