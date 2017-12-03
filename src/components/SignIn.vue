<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm4 offset-sm4>
        <v-card>
          <v-card-text>
            <v-form v-model="valid" @submit.prevent="signIn()">
              <v-text-field
                label="Username"
                v-model="credentials.username"
                :rules="usernameRules"
                :counter="20"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                label="Password"
                v-model="credentials.password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-btn class="primary" type="submit">Sign In</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>
  import auth from '../auth'

  export default {
    name: 'SignIn',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: '',
        valid: false,
        usernameRules: [
          (v) => !!v || 'Name is required',
          (v) => v.length <= 20 || 'Name must be less than 20 characters'
        ],
        passwordRules: [
          (v) => !!v || 'E-mail is required',
        ]
      }
    },
    methods: {
      signIn() {
        console.info('signing in');
        this.$store.dispatch("login", {
          username: this.credentials.username,
          password: this.credentials.password
        });
      }
    }
  }
</script>
