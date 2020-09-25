<template>
		<div class="row">
      <router-link :to="{name: 'Add'}">
        <button class="btn btn-sm btn-primary m-1">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4a.5.5 0 0 0-1 0v3.5H4a.5.5 0 0 0 0 1h3.5V12a.5.5 0 0 0 1 0V8.5H12a.5.5 0 0 0 0-1H8.5V4z"/>
            </svg>
        </button>
      </router-link>

      <table class="table table-sm table-striped">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Priory</th>
            <th scope="col">State</th>
            <th scope="col" colspan="2">Operations</th>
          </tr>
        </thead>
        <HourGlass v-if="stateLoading"></HourGlass>
        <tbody v-else>
          <tr v-for="(task, index) in arrayListTasks" :key="task.id">
            <th>{{ task.id }}</th>
            <td>{{ task.name }}</td>
            <td>{{ task.priory }}</td>
            <td>{{ task.state}}</td>
            <td>
              <router-link :to="{ name : 'Edit', params: { id : task.id} }">
                <button class="btn btn-sm btn-success">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </button>
              </router-link>
              </td>
            <td>
                <button class="btn btn-sm btn-danger" @click="deleteOneDocumentFirestore({id : task.id, index : index})">
                  <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import {HourGlass} from 'vue-loading-spinner'
import { mapActions, mapState } from 'vuex'

export default {

  name: 'Tasks',
  mounted () {
    this.getCollectionsFromFirebase()
  },
  methods : {
    ...mapActions( ['getCollectionsFromFirebase','deleteOneDocumentFirestore'] )
  },
  computed : {
    ...mapState ( ['arrayListTasks','stateLoading'] )
  },
  components: {
    HourGlass
  }
}
</script>

<style lang="css" scoped>
.table{position: relative;}
.spinner{
  position: absolute;
  left: 50%;
  top: 100px;
}
</style>