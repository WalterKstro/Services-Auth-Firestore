<template>
  <form>
    <div class="form-group">
      <input type="text" class="form-control"
             placeholder="Ingrese el termino a buscar"
             v-model="searchWord"
             @keyup="getWordInputSearch(searchWord)"
      >
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      searchWord: null
    }
  },
  methods: {
    ...mapActions(['getWordInputSearch'])
  }
}
</script>

<style scoped>

</style>