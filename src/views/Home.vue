<template>
  <div class="home container">
    <p>Bienvenido: <strong>{{ getStateUser.email }}</strong></p>
    <Tasks />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tasks from '@/components/Tasks'
export default {
  name: 'Home',
  components: {
    Tasks
  },
  computed: {
    ...mapGetters(['getStateUser'])
  }
}
</script>
<style lang="css" scoped>
 p{
   position: absolute;
   bottom: 2%;
 }
</style>
