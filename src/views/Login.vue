<template>
   <div class="container mt-5">
     <div class="row">
       <div class="col-4 offset-4">
         <h1>Login Account</h1>
         <form @submit.prevent="signInUsername(user)">
           <div class="form-group">
             <label for="email">Email address</label>
             <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model.trim="$v.user.email.$model">
             <div class="text-danger" v-if="!$v.user.email.required">Campo requerido</div>
           </div>
           <div class="form-group">
             <label for="pass">Password</label>
             <input type="password" class="form-control" id="pass" v-model.trim="$v.user.pass.$model">
             <div class="text-danger" v-if="!$v.user.pass.required">Campo requerido</div>
             <div class="text-danger" v-if="!$v.user.pass.minLength">El password debe de tener {{$v.user.pass.$params.minLength.min}} caracteres</div>
           </div>
           <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Log In</button>
         </form>
       </div>
     </div>
   </div>
</template>

<script>
import { required,minLength } from 'vuelidate/lib/validators'
import {mapActions, mapGetters} from 'vuex'

   export default {
      name : 'Login',
      data () {
         return {
            user : {
               email : undefined,
               pass : undefined
            },
           submitStatus: null
         }
      },
      methods : {
         ...mapActions(['signInUsername'])
      },
      computed : {
        ...mapGetters(['getError'])
      },
     validations: {
        user: {
          email: {required},
          pass: {
            required,
            minLength: minLength(6)
          }
        }
     }
   }
</script>

<style lang="scss" scoped>

</style>