<template>
   <div class="container">
     <h1>Login Account</h1>
      <form @submit.prevent="signInUsername(user)">
         <div class="form-group">
         <label for="email">Email address</label>
         <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="user.email">
         </div>
         <div class="form-group">
         <label for="pass">Password</label>
         <input type="password" class="form-control" id="pass" v-model="user.pass">
         </div>
         <div class="alert alert-danger" role="alert" v-if="getError">
            {{getError}}
         </div>
         <button type="submit" class="btn btn-primary">Log In</button>
      </form>
   </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

   export default {
      name : 'Login',
      data () {
         return {
            user : {
               email : undefined,
               pass : undefined
            }
         }
      },
      methods : {
         ...mapActions(['signInUsername'])
      },
      computed : {
         ...mapGetters(['getError'])
      }
   }
</script>

<style lang="scss" scoped>

</style>