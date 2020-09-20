<template>
   <div class="container">
      
      <form @submit.prevent="updateOneDocument(getOneDocumentStorage)">
      <div class="form-group">
         <label for="id">Id</label>
         <input type="text" class="form-control" id="id" disabled v-model="getOneDocumentStorage.id">
      </div>
      <div class="form-group">
         <label for="name">Name</label>
         <input type="text" class="form-control" id="name" v-model="getOneDocumentStorage.name">
      </div>
      <div class="form-group">
         <label for="priory">Priory</label>
         <input type="text" class="form-control" id="priory" v-model="getOneDocumentStorage.priory">
      </div>
      <div class="form-group">
         <label for="state">State</label>
         <input type="text" class="form-control" id="state" v-model="getOneDocumentStorage.state">
      </div>
      <button type="submit" class="btn btn-primary">Confirmar</button>
      </form>
      
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

   export default {
      name : 'edit',
      mounted() {
         this.getOneDocument( this.id )
      },
      data () {
         return {
            id : this.$route.params.id
         }
      },
      methods : {
         ...mapActions(['getOneDocument','updateOneDocument'])
      },
      computed : {
         ...mapGetters( ['getOneDocumentStorage'] )
      }
   }
</script>

<style lang="scss" scoped>

</style>