<template>
  
  <input
      type="text"
      class="form-control my-2"
      placeholder="Ingrese su nombre"
      v-model.trim="tarea.nombre"
    />

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="check-1"
        v-model="tarea.categorias"
        value="javascript"
      />
      <label class="form-check-label" for="check-1">Javascript</label>
    </div>

    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="checkbox"
        id="check-2"
        v-model="tarea.categorias"
        value="node js"
      />
      <label class="form-check-label" for="check-2">Node.JS</label>
    </div>

    <div class="mt-3">

      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="radio1"
          value="Urgente"
          v-model="tarea.estado"
        />
        <label class="form-check-label" for="radio1">Urgente</label>
      </div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          id="radio2"
          value="Relax"
          v-model="tarea.estado"
        />
        <label class="form-check-label" for="radio2">Relax</label>
      </div>

    </div>

    <div class="mt-3">
      <input 
        type="number"
        class="form-control"
        v-model.number="tarea.numero"
        >
    </div>

    <button 
      class="btn btn-dark mt-3 mb-3 btn-block" 
      type="submit"
      :disabled='bloquear'
      >
      Procesar
    </button>

</template>

<script>
export default {
    props: {
        tarea: Object
    },
    computed: {
      bloquear(){
        return this.tarea.nombre.trim() === "" ? true : false
      }
    }
}
</script>
