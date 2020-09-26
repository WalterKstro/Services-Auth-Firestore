import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db} from '../init-firebase.js'
import router from '@/router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user : undefined,
    error : undefined,

    arrayListTasks : [],
    oneDocument : '',
    errorFirestore: undefined,

    stateLoading: null,
    search: ''
  },
  mutations: {
      /**
       * Set word search filter
       * @param state
       * @param word
       */
      setWordSearch(state, word) {
          state.search = word
      },

      /**
       * State loading effect
       * @param state
       * @param conditional
       */
      setStateLoading(state, conditional) {
        state.stateLoading = conditional
      },


    /**
     * Set new user store
     */
    setNewAccount (state, account) {
      state.user = account
    },



    /**
     * Set error new account store
     * @param {*} state 
     * @param {*} msg 
     */
    setErrorNewAccount (state, msg) {
      state.error = msg
    },




    /**
     * MUTATIONS OF CRUD FIRESTORE
     */


     /**
      * Register Error Firestore
      * @param {*} state 
      * @param {*} error 
      */
     setErrorFirestore ( state, error) {
       state.errorFirestore = error
     },



    /**
  	 *Set collections to store local (arrayListTasks)
  	 * @param state -> state of vuex
  	 *@param tasks -> array
  	 */
      setDocumentsToStore ( state, tasks ) {
        state.arrayListTasks = tasks
      },



      /**
      * Set One Document to storage (oneDocument)
      * @param {*} state 
      * @param {*} doc 
      */
      setOneDocument ( state, obj) {
        state.oneDocument = obj
      },


      /**
      * Remove an object to store local
      * @param {*} state 
      * @param {*} id 
      */
      deleteOneDocument ( state, id) {
        state.arrayListTasks.splice(id,1)
      }


  },
  actions: {


      /**
       * Get word filter search
       * @param commit
       * @param word
       */
      getWordInputSearch({commit}, word) {
          commit('setWordSearch', word.toLowerCase())
      },


    /**
     * Create new account to firebase
     * @param {*} param0 
     * @param {*} account 
     */
    async createNewAccountFirebase ({commit}, account) {
      await auth.createUserWithEmailAndPassword( account.email, account.pass )
      .then ( response => {
        
        commit('setNewAccount',{email : response.user.email, id : response.user.uid})

        /**
         * Create new collection every user with your email
         */
        db.collection(response.user.email).add({
          name : 'Welcome',
          priory : 0,
          state : false
        })
        .then( docRef => {
          console.log( 'Documento con ID :'+ docRef.id )
        })
        .catch(error => {
          console.log('Error: '+ error)
        })

        
        router.push({name:'Home'})
      })
      .catch( error => {
        commit('setErrorNewAccount', error)
      })
    },



    /**
     * Autentication with email and password
     * @param {*} param0 
     * @param {*} user 
     */
    async signInUsername ({commit}, user) {
      commit('setStateLoading', true)
      await auth.signInWithEmailAndPassword(user.email, user.pass)
      .then( response => {
        commit('setNewAccount',{email : response.user.email, id : response.user.uid})
        commit('setStateLoading', false)
        router.push({name:'Home'})
      })
      .catch( error =>{
        commit('setErrorNewAccount', error.message)
      })
    },


    /**
     * Observable state of user
     * @param {*} param0 
     * @param {*} user 
     */
    observableUsername ({commit}, user) {
      commit('setNewAccount', user)
    },


    /**
     * Close sessions
     * @param {*} param0 
     */
    closeSessions ({commit}) {
      auth.signOut()
      commit( 'setNewAccount',null )
      router.push({name: 'Login'})
    },




    /**
     * ACTIONS OF CRUD FIREBASE
     */



    /**
  	 * Get all collections from Firestore
  	 * @param commit -> commit of vuex
  	 *
  	 */
      getCollectionsFromFirebase ( {commit,state} ) {
          let tasks = []
        commit('setStateLoading', true)
          db.collection( state.user.email ).get()
          .then( querySnapshot => {
            querySnapshot.forEach( doc => {
              let task = doc.data()
              task.id = doc.id
              tasks.push ( task )
            })
              commit('setStateLoading', false)
          })
          /**
           * Throw a commit
           * @param tasks -> array
           *
           */
          
          commit ( 'setDocumentsToStore', tasks )
      },



	/**
	 * Get one Document from Firestore
	 * @param {commit}
	 */
	getOneDocument ( {commit,state}, id ) {
		
		db.collection( state.user.email ).doc( id ).get()
		.then ( doc => {
			if (doc.exists) {
				let obj = doc.data()
				obj.id = id
				commit( 'setOneDocument', obj )
			}else{
				console.log('no exist')
			}
		}).catch(error => {
			console.log(`Error getting document: ${ id }` + error)
		})
	},


	
	/**
	 * Update document from Firestore
	 * @param {*} param0 
	 * @param {*} doc 
	 */
	updateOneDocument ( {commit, state}, doc) {
		db.collection( state.user.email ).doc( doc.id ).update({
			name : doc.name,
			priory : doc.priory,
			state : doc.state
		})
		.then ( function () {
			router.push({name : 'Home'})
		})
		.catch( error => {
			commit('setErrorFirestore', error)
		})
	},


	/**
	 * Set a new documento to Firestore
	 * @param {*} param0 
	 */
	setNewDocumentFirestore ( {commit, state}, doc ) {
		db.collection( state.user.email ).add({
			name : doc.name,
			priory : doc.priory,
			state : doc.state
		})
			.then(function (docRef){
				console.log("Document written with ID: ", docRef.id);
      })
      .then (error => {
        commit('setErrorFirestore', error)
      })
		.then(() => {
			router.push({ name: "Home" })
		})
	},
	
	
	/**
	 * Delete a document from Firestore
	 * @param {*} param0 
	 * @param {*} obj 
	 */
	deleteOneDocumentFirestore ( {commit, state }, obj) {
		db.collection( state.user.email ).doc( obj.id ).delete()
      .then( () => {
        alert(`Document with id: ${obj.id} is deleted success`)
        commit('deleteOneDocument', obj.index)
      })
      .catch( error => {
        commit('setErrorFirestore', error)
      })
    }
  },


  getters : {


    /**
     * Get error
     * @param {*} state
     */
    getError( state ) {
      return state.error
    },


    /**
     * Get state
     * @param {*} state
     */
    getStateUser (state) {
      return state.user
    },

      /**
       * Get filter search
       * @param state
       */
      getFilterSearch(state) {
        return state.arrayListTasks.filter( task => {
            return task.name.toLowerCase().includes(state.search)
        })
      },




    /**
     * GETTERS OF CRUD FIRESTORE
     */


     /**
		 * Get One Document from State local
		 * @param {*} state 
		 * return oneDocument local
		 */
		getOneDocumentStorage ( state ) {
			return state.oneDocument
    }
    
  },
  modules: {
  }
})
