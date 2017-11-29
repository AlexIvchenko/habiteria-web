<template>
  <div>

    <b-btn v-b-modal.createHabit>Create Habit</b-btn>

    <b-modal id="createHabit" title="Create Habit" @ok="doCreateHabit">
      <p class="my-4">Hello from modal!</p>
      <b-form-input v-model="newHabit.name"></b-form-input>
      <b-form-input v-model="newHabit.description"></b-form-input>
      <b-form-select v-model="newHabit.schedule.type" :options="habitScheduleTypes" class="mb-3"></b-form-select>
    </b-modal>


    <b-card-group columns>
      <b-card v-for="habit in habits" :key="habit.name" border-variant="secondary"
              :header="habit.name"
              header-bg-variant="secondary"
              header-text-variant="white"
              align="center">
        <p class="card-text">{{ habit.description }}</p>
        <b-button v-if="habit._links.getCalendar" variant="success" disabled>Calendar</b-button>
      </b-card>
    </b-card-group>

  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'Habits',
    data() {
      return {
        newHabit: {
          name: "",
          description: "",
          schedule: {
            type: ""
          }
        },
        habitScheduleTypes: [
          {text: "Daily", value: "DAILY"},
          {text: "Weekday", value: "WEEKDAY"},
          {text: "Weekend", value: "WEEKEND"}
        ],
        actions: null,
        habits: []
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
      doCreateHabit: function (event) {
        api.getActions()
          .then(function (response) {
            this.actions = response.data._links;
            const createHabitUrl = this.actions.createHabit.href;
            console.log('create habit url = ' + createHabitUrl);
            return api.post(createHabitUrl, this.newHabit);
          }.bind(this))
          .then(function (response) {
            return this.createGetHabitsRequest();
          }.bind(this))
          .then(function (response) {
            this.handleGetHabitsRequest(response);
          }.bind(this))
          .catch(function (error) {
            console.log(error);
          });
      },

      createGetHabitsRequest: function () {
        const getHabitsUrl = this.actions.getHabits.href;
        console.log("get habits url: " + getHabitsUrl);
        return api.get(getHabitsUrl);
      },

      handleGetHabitsRequest: function (response) {
        this.habits = response.data._embedded.habitResourceList;
        console.log(response.data._embedded);
      },

      refreshHabits: function () {
        this.createGetHabitsRequest()
          .then(function (response) {
            this.handleGetHabitsRequest(response)
          }.bind(this))
          .catch(function (error) {
            console.info(error);
          })
      }
    }
  }
</script>
