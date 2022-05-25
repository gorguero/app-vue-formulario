<template>

  <h1>Formularios con Vue.js</h1>

  <form @submit.prevent="procesarForm">
    <Input :tarea="tarea" />
  </form>

  <hr>

  <ListaTareas />
  
</template>

<script>
import Input from '../components/Input.vue';
import ListaTareas from '../components/ListaTareas.vue';
import {mapActions} from 'vuex';
const shortid = require('shortid');

export default {

  name: "HomeView",
  components: {
    Input, ListaTareas
  },

  data() {
    return {
      tarea: {
        id: '',
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      },
    };
  },

  methods: {

    ...mapActions(['setTareas', 'cargarLocalStorage']),

    procesarForm(){
      console.log(this.tarea);

      if(this.tarea.nombre.trim() === ""){
        console.log('Esta vacio');
        return;
      }

      console.log('No esta vacio');

      //Generar ID
      this.tarea.id = shortid.generate();

      //Enivamos los datos del formulario
      this.setTareas(this.tarea);

      //Limpiar datos
      this.tarea = {
        id: '',
        nombre: "",
        categorias: [],
        estado: "",
        numero: 0
      }

    },

  },

  created(){
    this.cargarLocalStorage();
  }

};
</script>
