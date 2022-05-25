<template>
  Edit {{$route.params.id}} - {{tarea}}

    <form @submit.prevent="updateTareas(tarea)">
        <Input :tarea="tarea"/>
    </form>
    

</template>

<script>
import Input from '@/components/Input.vue';
import {mapState, mapActions} from 'vuex';

export default {

    components: { Input },

    computed: {
        ...mapState(['tarea'])
    },
    methods: {
        ...mapActions(['setTarea', 'updateTareas'])
    },
    created(){
        this.setTarea(this.$route.params.id);
    }

}
</script>