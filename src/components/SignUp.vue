<template>
  <div class="container">
    <div class="row">
      <div class="col-4">

      </div>
      <div class="col-4">

      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="form-group">
              <b-form-input name="username" v-model="credentials.username" type="text" class="form-control"
                            id="username"
                            :state="uState"
                            aria-describedby="password-help password-feedback"
                            placeholder="Enter username"></b-form-input>
              <b-form-invalid-feedback id="username-feedback">
                {{ errors.fieldErrors.username }}
              </b-form-invalid-feedback>
              <b-form-text id="username-help">
                Enter your username.
              </b-form-text>
            </div>
            <div class="form-group">
              <b-form-input name="email" v-model="credentials.email" type="text" class="form-control"
                            id="email"
                            :state="eState"
                            aria-describedby="email-help email-feedback"
                            placeholder="Enter email"></b-form-input>
              <b-form-invalid-feedback id="email-feedback">
                {{ errors.fieldErrors.email }}
              </b-form-invalid-feedback>
              <b-form-text id="email-help">
                Enter your email.
              </b-form-text>
            </div>
            <div class="form-group">
              <b-form-input name="password" v-model="credentials.password" type="password" class="form-control"
                            id="password"
                            :state="pState"
                            aria-describedby="password-help"
                            placeholder="Password"></b-form-input>
              <b-form-invalid-feedback id="password-feedback">
                {{ errors.fieldErrors.password }}
              </b-form-invalid-feedback>
              <b-form-text id="password-help">
                Enter your password.
              </b-form-text>
            </div>
            <button class="btn btn-primary btn-lg" v-on:click="signUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    name: 'SignUp',
    data() {
      return {
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
      }
    },
    computed: {
      uState() {
        return this.errors.fieldErrors.username === undefined || this.errors.fieldErrors.username === null;
      },
      eState() {
        return this.errors.fieldErrors.email === undefined || this.errors.fieldErrors.email === null;
      },
      pState() {
        return this.errors.fieldErrors.password === undefined || this.errors.fieldErrors.password === null;
      }
    },
    methods: {
      signUp() {
        auth.signUp(this, this.credentials, '/signIn');
      }
    }
  }
</script>
