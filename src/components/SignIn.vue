<template>
  <div class="container">
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
            <label for="password">Password</label>
            <input name="password" v-model="credentials.password" type="password" class="form-control"
                   id="password"
                   aria-describedby="passwordHelp" placeholder="Password"/>
          </div>
          <button class="btn btn-primary btn-lg" v-on:click="signIn">Sign In</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    name: 'SignIn',
    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      signIn() {
        console.info('signing in');
        auth.signIn(this, this.credentials, 'tracking')
      }
    }
  }
</script>
