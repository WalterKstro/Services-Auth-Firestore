<template>
  <nav class="navbar container d-flex">
    <router-link :to="{name: 'Home'}" v-if="getStateUser">Home</router-link>
    <router-link :to="{ name : 'Register'}" v-if="!getStateUser">Register</router-link>
    <router-link :to="{ name : 'Login'}" v-if="!getStateUser">Log In</router-link>
    <a  href="#" @click="closeSessions" v-if="getStateUser">Sing out</a>    
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Navegacion',
  methods: {
    ...mapActions(['closeSessions'])
  },
  computed: {
    ...mapGetters(['getStateUser'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
