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
            <v-form v-model="valid" @submit.prevent="signUp()">
              <v-text-field
                label="Username"
                v-model="credentials.username"
                :rules="usernameRules"
                :counter="20"
                required
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="credentials.email"
                :rules="emailRules"
                required
              ></v-text-field>
              <v-text-field
                type="password"
                label="Password"
                v-model="credentials.password"
                :rules="passwordRules"
                required
              ></v-text-field>
              <v-btn class="primary" type="submit" :disabled="!formIsValid" :loading="loading">
                Sign Up
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
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
    name: 'Test',
    data: () => ({
      credentials: {
        username: '',
        password: '',
        email: '',
      },
      valid: false,
      usernameRules: [
        (v) => !!v || 'Username is required',
        (v) => v.length <= 20 || 'Username must be less than 20 characters',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
      ]
    }),

    computed: {
      formIsValid() {
        return this.credentials.username !== '' &&
          this.credentials.email !== '' &&
          this.credentials.password !== ''
      },
      loading() {
        return this.$store.getters.loading;
      },
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
          this.$router.push("/habit/new")
        }
      }
    },
    methods: {
      signUp() {
        console.info('signing up');
        this.$store.dispatch("signUp", {
          username: this.credentials.username,
          email: this.credentials.email,
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
