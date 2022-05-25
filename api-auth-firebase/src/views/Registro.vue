<template>
  
  <h1 class="my-5">Registro de Usuarios</h1>

  <form @submit.prevent="procesarFormulario()">

    <input 
        type="email" 
        placeholder="email"
        class="form-control my-2"
        v-model.trim="email"
    >
    <input 
        type="password" 
        placeholder="password"
        class="form-control my-2"
        v-model.trim="password1"
    >
    <input 
        type="password" 
        placeholder="Repetir password"
        class="form-control my-2"
        v-model.trim="password2"
    >

    <button 
        type="submit" 
        class="btn btn-primary" 
        :disabled = "bloquear"
    >Registrarse</button> 

  </form>

</template>

<script>
import { mapActions } from 'vuex';
export default {

    data() {
        return {
            email: '',
            password1: '',
            password2: ''
        }
    },

    computed: {

        bloquear(){

            if(!this.email.includes('@')){
                return true;
            }

            if(this.password1.length > 5 && this.password1 === this.password2){
                return false;
            }

            return true;

        }

    },

    methods: {

        ...mapActions(['registrarUsuario']),

        procesarFormulario(){
            this.registrarUsuario( {email: this.email, password: this.password1} );
            this.email = '',
            this.password1 = '',
            this.password2 = ''
        }

    }

}
</script>