<template>
  <div class="home container">
    <div class="row">
      <div class="col-4 offset-4">
        <Search />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <Tasks />
      </div>
    </div>
    <div class="row">
      <div class="col"><p>Bienvenido: <strong>{{ getStateUser.email }}</strong></p></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tasks from '@/components/Tasks'
import Search from "@/components/Search";
export default {
  name: 'Home',
  components: {
    Tasks,
    Search
  },
  computed: {
    ...mapGetters(['getStateUser'])
  }
}
</script>
<style lang="css" scoped>
 
</style>
