<template>
   <div class="container mt-5">
      <div class="row">
        <div class="col-4 offset-4">
          <form @submit.prevent="updateOneDocument(getOneDocumentStorage)">
            <div class="form-group">
              <label for="id">Id</label>
              <input type="text" class="form-control" id="id" disabled v-model="getOneDocumentStorage.id">
            </div>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model.trim="$v.getOneDocumentStorage.name.$model">
              <div class="text-danger" v-if="!$v.getOneDocumentStorage.name.required">Campo requerido</div>
            </div>
            <div class="form-group">
              <label for="priory">Priory</label>
              <input type="text" class="form-control" id="priory" v-model.trim="$v.getOneDocumentStorage.priory.$model">
              <div class="text-danger" v-if="!$v.getOneDocumentStorage.priory.required">Campo requerido</div>
            </div>
            <div class="form-group">
              <label for="state">State</label>
              <input type="text" class="form-control" id="state" v-model.trim="$v.getOneDocumentStorage.state.$model">
              <div class="text-danger" v-if="!$v.getOneDocumentStorage.state.required">Campo requerido</div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Confirmar</button>
          </form>
        </div>
      </div>
   </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

   export default {
      name : 'edit',
      mounted() {
         this.getOneDocument( this.id )
      },
      data () {
         return {
            id : this.$route.params.id,
           submitStatus: null
         }
      },
      methods : {
         ...mapActions(['getOneDocument','updateOneDocument'])
      },
      computed : {
         ...mapGetters( ['getOneDocumentStorage'] )
      },
     validations: {
       getOneDocumentStorage: {
         name: {required},
         priory: {required},
         state: {required}
       }
     }
   }
</script>

<style lang="scss" scoped>

</style>