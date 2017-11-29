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
              <label for="username">Username</label>
              <input name="username" v-model="credentials.username" type="text" class="form-control"
                     id="username"
                     placeholder="Enter username"/>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input name="email" v-model="credentials.email" type="text" class="form-control"
                     id="email"
                     placeholder="Enter email"/>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input name="password" v-model="credentials.password" type="password" class="form-control"
                     id="password"
                     aria-describedby="passwordHelp" placeholder="Password"/>
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
          username: '',
          password: '',
          email: '',
        },
        error: ''
      }
    },
    methods: {
      signUp() {
        auth.signUp(this, this.credentials, null)
      }
    }
  }
</script>
