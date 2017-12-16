<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab accent small slot="activator">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Habit</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                name="name"
                label="Name"
                id="name"
                v-model="editedName"
                required
              ></v-text-field>

              <v-text-field
                name="description"
                label="Description"
                id="description"
                v-model="editedDescription"
                required
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="blue--text darken-1" @click="editDialog = false">Close</v-btn>
              <v-btn flat class="blue--text darken-1" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['habit'],
    data() {
      return {
        editDialog: false,
        editedName: this.habit.name,
        editedDescription: this.habit.description,
      }
    },
    computed: {
      formIsValid() {
        return this.habit.name !== '';
      }
    },
    methods: {
      onSaveChanges() {
        console.log("saving");
        if (this.editedName.trim() === '') {
          return
        }
        this.editDialog = false;
        console.log("dispatching");
        this.$store.dispatch('updateHabitDetails', {
          name: this.editedName,
          description: this.editedDescription,
          habit: this.habit
        })
      }
    }
  }

</script>
