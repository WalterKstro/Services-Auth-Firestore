<template>
      <div class="container mt-5">
         <div class="row">
           <div class="col-4 offset-md-4">
             <form @submit.prevent="setNewDocumentFirestore(doc)">
               <div class="form-group">
                 <label for="name">Name</label>
                 <input type="text" class="form-control" id="name" v-model.trim="$v.doc.name.$model">
                 <div class="text-danger" v-if="!$v.doc.name.required">Campo requerido</div>
               </div>
               <div class="form-group">
                 <label for="priory">Priory</label>
                 <select class="form-control" id="priory" v-model.trim="$v.doc.priory.$model">
                   <option selected>Plese select one priory</option>
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                 </select>
                 <div class="text-danger" v-if="!$v.doc.priory.required">Campo requerido</div>
               </div>
               <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Confirmar</button>
             </form>
           </div>
         </div>
      </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {mapActions} from 'vuex'
export default {
   name : 'Add',
   data () {
      return {
         doc : {
            name : '',
            priory : undefined,
            state : false
         },
        submitStatus: null
      }
   },
   methods : {
      ...mapActions(['setNewDocumentFirestore'])
   },
  validations: {
     doc: {
       name: {required},
       priory: {required}
     }
  }
}
</script>

<style lang="css" scoped>
.form-group{margin-bottom: 2rem;}
</style>