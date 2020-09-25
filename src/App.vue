<template>
  <div id="app">
    <div id="nav">
      <Navegacion/>
      <router-view/>
    </div>
  </div>
</template>


<script>
import Navegacion from "@/components/Navegacion";
export default {
  name: 'App',
  components: {
    Navegacion
  }
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-right: 10px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.text-danger{font-size: 11px;}
</style>
