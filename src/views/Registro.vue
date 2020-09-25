<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-4 offset-4">
        <h1>New account</h1>
        <form @submit.prevent="createNewAccountFirebase(account)">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="account.email">
            <div class="text-danger" v-if="!$v.account.email.required">Campo requerido</div>
          </div>
          <div class="form-group">
            <label for="pass">Password</label>
            <input type="password" class="form-control" id="pass" v-model="account.pass">
            <div class="text-danger" v-if="!$v.account.pass.required">Campo requerido</div>
            <div class="text-danger" v-if="!$v.account.pass.minLength">El password debe de tener {{$v.account.pass.$params.minLength.min}} caracteres</div>
          </div>
          <div class="form-group">
            <label for="passConfirm">Repeat Password</label>
            <input type="password" class="form-control" id="passConfirm" v-model="account.passConfirm">
            <div class="text-danger" v-if="!$v.account.passConfirm.required">Campo requerido</div>
            <div class="text-danger" v-if="!$v.account.passConfirm.sameAsPassword">Password deben ser idénticos</div>
          </div>
          <div class="alert alert-danger" role="alert" v-if="getError">
            {{getError.code}}
          </div>
          <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Create account</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { required,minLength,sameAs } from 'vuelidate/lib/validators'
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
      ...mapGetters(['getError'])
    },
    validations: {
      account: {
        email: {required},
        pass: {
          required,
          minLength: minLength(6)
        },
        passConfirm: {
          required,
          sameAsPassword: sameAs('pass')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>