<template>
  <v-container>
    <v-layout>
      <v-flex  xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex>
                <h5 class="headline primary--text">Create a new Habit</h5>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex>
                <v-form @submit.prevent="onCreateHabit">
                  <v-layout row>
                    <v-flex>
                      <v-text-field
                        name="name"
                        label="Name"
                        id="name"
                        v-model="habit.name"
                        required
                        :rules="nameRules"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex>
                      <v-text-field
                        name="description"
                        label="Description"
                        id="description"
                        v-model="habit.description"
                        required
                        clearable
                      ></v-text-field>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs12>
                      <v-select
                        v-bind:items="items"
                        v-model="habit.schedule.type"
                        label="Type"
                        dark
                        item-value="value"
                      ></v-select>
                    </v-flex>
                  </v-layout>

                  <v-layout row wrap>
                    <v-flex xs12 sm6>
                      <v-menu
                        lazy
                        :close-on-content-click="false"
                        v-model="menu1"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          label="Start Date"
                          v-model="habit.schedule.start"
                          prepend-icon="event"
                          readonly
                          :rules="startRules"
                        ></v-text-field>
                        <v-date-picker v-model="habit.schedule.start" no-title scrollable actions :allowed-dates="availableDates">
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="save">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>

                    <v-flex xs12 sm6>
                      <v-menu
                        lazy
                        :close-on-content-click="false"
                        v-model="menu2"
                        transition="scale-transition"
                        offset-y
                        full-width
                        :nudge-right="40"
                        max-width="290px"
                        min-width="290px"
                      >
                        <v-text-field
                          slot="activator"
                          label="End Date"
                          v-model="habit.schedule.end"
                          :rules="endRules"
                          prepend-icon="event"
                          readonly
                        ></v-text-field>
                        <v-date-picker v-model="habit.schedule.end" no-title scrollable actions :allowed-dates="availableDates">
                          <template slot-scope="{ save, cancel }">
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                              <v-btn flat color="primary" @click="save">OK</v-btn>
                            </v-card-actions>
                          </template>
                        </v-date-picker>
                      </v-menu>
                    </v-flex>
                  </v-layout>

                  <v-layout row>
                    <v-flex xs12 sm12 md12 lg12>
                      <v-btn class="primary" type="submit" :disabled="!formIsValid">Create Habit</v-btn>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        menu1: false,
        menu2: false,
        habit: {
          name: '',
          description: '',
          schedule: {
            start: null,
            end: null,
            type: '',
          }
        },
        nameRules: [
          (v) => !!v || 'Name is required'
        ],
        startRules: [
          (v) => !!v || 'start date is required',
        ],
        endRules: [
          (v) => !!v || 'end date is required',
        ],
        availableDates: function (str) {
          const now = new Date();
          const date = new Date(str);
          now.setHours(0,0,0,0);
          date.setHours(0,0,0,0);
          return date >= now
        },
        items: [
          {value: 'DAILY', text: 'Daily'},
          {value: 'WEEKEND', text: 'Weekend'},
          {value: 'WEEKDAY', text: 'Weekday'}
        ]
      }
    },
    watch: {
      end(value) {
        if (value < this.habit.schedule.start) {
          this.habit.schedule.start = null
        }
      },
      start(value) {
        if (value > this.habit.schedule.end) {
          this.habit.schedule.end = null
        }
      }
    },
    computed: {
      end() {
        return this.habit.schedule.end;
      },
      start() {
        return this.habit.schedule.start;
      },
      formIsValid() {
        return this.habit.name !== '' &&
          this.habit.schedule.type !== '' &&
          this.habit.schedule.start !== '' &&
          this.habit.schedule.end !== '' &&
          new Date(this.habit.schedule.end) > new Date(this.habit.schedule.start);
      }
    },
    methods: {
      onCreateHabit() {
        this.$store.dispatch('createHabit', {
          name: this.habit.name,
          description: this.habit.description,
          schedule: {
            start: this.habit.schedule.start,
            end: this.habit.schedule.end,
            type: this.habit.schedule.type
          }
        }).then(() => {
          this.clearForm();
          this.$router.push('/habits')
        });
      },
      clearForm() {
        this.habit.name = '';
        this.habit.description = '';
        this.habit.schedule.start = '';
        this.habit.schedule.end = '';
        this.habit.schedule.type = '';
      }
    }
  }

</script>
