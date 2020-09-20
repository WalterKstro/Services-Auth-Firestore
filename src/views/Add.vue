<template>
      <div class="container">
         <form @submit.prevent="setNewDocumentFirestore(doc)">  
            <div class="form-group">
               <label for="name">Name</label>
               <input type="text" class="form-control" id="name" v-model="doc.name">
            </div>
            <div class="form-group">
               <label for="priory">Priory</label>
               <select class="form-control" id="priory" v-model="doc.priory">
                  <option selected>Plese select one priory</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
               </select>
            </div>
            <button type="submit" class="btn btn-primary">Confirmar</button>
         </form>
      </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
   name : 'Add',
   data () {
      return {
         doc : {
            name : '',
            priory : undefined,
            state : false
         }
      }
   },
   methods : {
      ...mapActions(['setNewDocumentFirestore'])
   }
}
</script>

<style>

</style>