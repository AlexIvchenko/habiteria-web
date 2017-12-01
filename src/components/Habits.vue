<template>
  <div>
    <md-dialog :md-active.sync="dialog">
      <md-dialog-title>Create habit</md-dialog-title>
      <md-card>
        <md-card-content>
          <div class="md-layout-row md-layout-wrap md-gutter">

            <div class="md-flex md-flex-small-100">
              <md-field>
                <label for="name">Name</label>
                <md-input name="name" id="name" v-model="newHabit.name"></md-input>
              </md-field>
            </div>

            <div class="md-flex md-flex-small-100">
              <md-field>
                <label for="description">Description</label>
                <md-input name="description" id="description" type="text" v-model="newHabit.description"></md-input>
              </md-field>
            </div>

            <div class="md-flex md-flex-small-100">
              <md-radio v-model="newHabit.schedule.type" value="DAILY">Daily</md-radio>
              <md-radio v-model="newHabit.schedule.type" value="WEEKDAY">Weekday</md-radio>
              <md-radio v-model="newHabit.schedule.type" value="WEEKEND">Weekend</md-radio>
            </div>

            <md-datepicker v-model="newHabit.schedule.startDate" ></md-datepicker>

            <md-dialog-actions>
              <md-button class="md-primary" @click="doCreateHabit">Create</md-button>
            </md-dialog-actions>
          </div>
        </md-card-content>
      </md-card>
    </md-dialog>

    <md-empty-state
      v-if="habits.length === 0"
      md-icon="devices_other"
      md-label="Create your first habit"
      md-description="Create habit you want to form">
      <md-button class="md-primary md-raised" @click="dialog = true">Create first habit</md-button>
    </md-empty-state>

    <md-list class="md-triple-line" v-if="habits.length !== 0">
      <md-subheader><md-button class="md-fab md-accent md-raised" @click="dialog = true"><md-icon>add</md-icon></md-button></md-subheader>
      <md-divider></md-divider>
      <div v-for="habit in habits" :key="habit.name">
        <md-list-item>
          <div class="md-list-item-text">
            <span>{{ habit.name }}</span>
            <span>{{ habit.description }}</span>
          </div>

          <md-button class="md-icon-button md-list-action">
            <md-icon>star</md-icon>
          </md-button>
        </md-list-item>

        <md-divider></md-divider>
      </div>
    </md-list>
  </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'Habits',
    data() {
      return {
        dialog: false,
        newHabit: {
          name: "",
          description: "",
          schedule: {
            type: 'DAILY',
            startDate: ''
          }
        },
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
      updateType() {
        console.log('update');
        if (this.weekday && this.weekend) {
          this.newHabit.schedule.type = 'DAILY'
        }
        if (this.weekday && !this.weekend) {
          this.newHabit.schedule.type = 'WEEKDAY'
        }
        if (!this.weekday && this.weekend) {
          this.newHabit.schedule.type = 'WEEKEND'
        }
        console.log(this.newHabit.schedule.type);
      },
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

<style lang="scss" scoped>
  .md-dialog {
    max-width: 768px;
  }

  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }
</style>


