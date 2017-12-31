<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm4 offset-sm4>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
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
  import auth from '../../auth/index'

  export default {
    name: 'SignIn',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
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
    computed: {
      error() {
        return this.$store.getters.error;
      },

      user() {
        return this.$store.getters.user;
      }
    },
    watch: {
      user(value) {
        if (value !== null && value !== undefined) {
          this.$router.push("/tracking")
        }
      }
    },
    methods: {
      signIn() {
        console.info('signing in');
        this.$store.dispatch("login", {
          username: this.credentials.username,
          password: this.credentials.password
        });
      },
      onDismissed() {
        console.log("dismissed");
        this.$store.dispatch("clearError");
      }
    }
  }
</script>
