<template>
  <section v-if="info">
    <div class="v-snack v-snack--top" >
      <div class="v-snack__wrapper v-snack__wrapper_info">
        <div class="v-snack__content">
          <p> {{ info }} </p>
          <div 
            class="closeContainer"
            @click="closeInfo()">
            <a 
              class="close" 
              href="#"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ModalInfo',
    computed: {
      info() {
        return this.$store.getters.GET_INFO;
      }
    },
    methods: {
      closeInfo() {
        this.$store.dispatch( 'CLEAR_INFO' );
      }
    },
  };
</script>