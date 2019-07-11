<template>
  <section v-if="error">
    <div class="v-snack v-snack--bottom" >
      <div class="v-snack__wrapper v-snack__wrapper_error">
        <div class="v-snack__content">
          <p> {{ error }} </p>
        </div>
        <div 
          class="closeContainer"
          @click="closeError()">
          <a 
            class="close" 
            href="#"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ModalError',
    computed: {
      error() {
        return this.$store.getters.GET_ERROR;
      }
    },
    methods: {
      closeError() {
        this.$store.dispatch( 'CLEAR_ERROR' );
      }
    }
  };
</script>