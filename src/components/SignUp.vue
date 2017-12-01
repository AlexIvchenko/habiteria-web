<template>
  <div>
    <form class="md-layout-row md-gutter">
      <md-card class="md-flex-50 md-flex-small-100">
        <md-card-header>
          <div class="md-title">Sign Up</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout-row md-layout-wrap md-gutter">
            <div class="md-flex md-flex-small-100">
              <md-field :class="getUsernameValidationClass()">
                <label for="username">Username</label>
                <md-input name="first-name" id="username" v-model="credentials.username"></md-input>
                <span class="md-error" v-if="">{{ errors.fieldErrors.username }}</span>
              </md-field>
            </div>

            <div class="md-flex md-flex-small-100">
              <md-field :class="getEmailValidationClass()">
                <label for="email">Email</label>
                <md-input name="email" id="email" type="email" v-model="credentials.email"></md-input>
                <span class="md-error" v-if="">{{ errors.fieldErrors.email }}</span>
              </md-field>
            </div>

            <div class="md-flex md-flex-small-100">
              <md-field :class="getPasswordValidationClass()">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="credentials.password"></md-input>
                <span class="md-error" v-if="">{{ errors.fieldErrors.password }}</span>
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-primary" @click="signUp">Sign Up</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import auth from '../auth'
  export default {
    name: 'Test',
    data: () => ({
      credentials: {
        username: "",
        password: "",
        email: "",
      },
      errors: {
        fieldErrors: {
          username: null,
          email: null,
          password: null
        },
        resourceErrors: [],
        errors: []
      }
    }),

    methods: {
      getUsernameValidationClass () {
        if (this.errors.fieldErrors.username === undefined || this.errors.fieldErrors.username === null) {
          return ''
        } else {
          return 'md-invalid'
        }
      },
      getEmailValidationClass () {
        if (this.errors.fieldErrors.email === undefined || this.errors.fieldErrors.email === null) {
          return ''
        } else {
          return 'md-invalid'
        }
      },
      getPasswordValidationClass () {
        if (this.errors.fieldErrors.password === undefined || this.errors.fieldErrors.password === null) {
          return ''
        } else {
          return 'md-invalid'
        }
      },
      signUp() {
        auth.signUp(this, this.credentials, '/tracking');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-card {
    width: 320px;
    margin: 0 auto;
  }
</style>
