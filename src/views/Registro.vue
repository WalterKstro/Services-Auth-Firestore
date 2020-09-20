<template>
  <div class="container">
    <h1>Register new account</h1>
    <form @submit.prevent="createNewAccountFirebase(account)">
      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="account.email">
      </div>
      <div class="form-group">
        <label for="pass">Password</label>
        <input type="password" class="form-control" id="pass" v-model="account.pass">
      </div>
      <div class="form-group">
        <label for="passConfirm">Confirm Password</label>
        <input type="password" class="form-control" id="passConfirm" v-model="account.passConfirm">
      </div>
      <div class="alert alert-danger" role="alert" v-if="getError">
      {{getError}}
      </div>
      <button type="submit" class="btn btn-primary" :disabled="validatePassword">Create account</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

  export default {
    name : 'Register',
    data () {
      return {
        account : {
          email : undefined,
          pass : undefined,
          passConfirm : undefined
        }
      }
    },
    methods : {
      ...mapActions( ['createNewAccountFirebase'] )
    },
    computed : {
      ...mapGetters(['getError']),
      validatePassword () {
        return !(this.account.pass === this.account.passConfirm && this.account.pass != '')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>