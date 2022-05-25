import { createStore } from 'vuex'
import router from '../router';

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: "",
      categorias: [],
      estado: "",
      numero: 0
    },

    user: null

  },
  getters: {
  },
  mutations: {

    set(state, payload){
      state.tareas.push(payload);
    },

    eliminar(state, payload){
      state.tareas = state.tareas.filter( item => item.id !== payload );
    },

    tarea(state, payload){

      if(!state.tareas.find( item => item.id === payload )){
        router.push('/');
        return;
      }
      state.tarea = state.tareas.find( item => item.id === payload );
    },

    update(state, payload){
      state.tareas = state.tareas.map( item => item.id === payload.id ? payload : item );
      router.push('/');
    },

    cargar(state, payload){
      state.tareas = payload;
    },

    setUser(state,payload){
      state.user = payload;
    }

  },
  
  actions: {

    async setTareas({commit, state},tarea){
      try {
        const respuesta = await fetch(`https://api-firebase-1e1b4-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`, {

          //Objeto con las configuraciones de fetch
          method: 'PUT',
          headers: { 'Content-Type': 'aplication/json' },
          body: JSON.stringify(tarea)

        })
        
        const dataDB = await respuesta.json();

      } catch (error) {
        console.log(error);
      }
      commit('set', tarea);
    },

    async deleteTareas({commit, state}, id){
      try {
        
        await fetch(`https://api-firebase-1e1b4-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${id}.json?auth=${state.user.idToken}`,{
          method: 'DELETE'
        })

        commit('eliminar',id);

      } catch (error) {
        console.log(error);
      }
      
    },

    setTarea({commit}, id){
      commit('tarea', id);
    },
    
    async updateTareas({commit, state}, tarea){

      try {
        
        const respuesta = await fetch(`https://api-firebase-1e1b4-default-rtdb.firebaseio.com/tareas/${state.user.localId}/${tarea.id}.json?auth=${state.user.idToken}`,{
          method: 'PATCH',
          body: JSON.stringify(tarea)
        });

        const dataDB = await respuesta.json();
        commit('update', dataDB);

      } catch (error) {
        console.log(error);
      }

    },

    async cargarLocalStorage({commit, state}){

      if(localStorage.getItem('usuario')){
        commit('setUser', JSON.parse(localStorage.getItem('usuario')));
      }else{
        return commit('setUser', null);
      }

      try {
        
        const respuesta = await fetch(`https://api-firebase-1e1b4-default-rtdb.firebaseio.com/tareas/${state.user.localId}.json?auth=${state.user.idToken}`);
        const dataDB = await respuesta.json();
        const arrayTareas = [];

        for(let id in dataDB){
          arrayTareas.push(dataDB[id]);
        }

        commit('cargar', arrayTareas);

      } catch (error) {
        console.log(error);
      }

    },

    async registrarUsuario({commit}, usuario){
      
      try {
        
        const respuesta = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD4wsgVXy4UEQ9P1ntXzCu80RkGaevE5Iw',{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        });

        const userDB = await respuesta.json();

        console.log(userDB);

        if(userDB.error){
          console.log(userDB.error)
          return;
        }

        commit('setUser', userDB);
        router.push('/');
        localStorage.setItem('usuario', JSON.stringify(userDB));

      } catch (error) {
        console.log(error)
      }

    },

    async ingresoUsuario({commit}, usuario){

      try {
        
        const respuesta = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD4wsgVXy4UEQ9P1ntXzCu80RkGaevE5Iw',{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        });

        const userDB = await respuesta.json();

        console.log('User db: ', userDB);

        if(userDB.error){
          return console.log(userDB.error);
        }

        commit('setUser', userDB);
        router.push('/');
        localStorage.setItem('usuario', JSON.stringify(userDB));

      } catch (error) {
        console.log(error);
      }

    },

    cerrarSesion({commit}){
      commit('setUser', null);
      router.push('/ingreso');
      localStorage.removeItem('usuario');
    }

  },
  getters: {
    usuarioAutenticado(state){
      return !!state.user;
    }
  },
  modules: {
  }
})
