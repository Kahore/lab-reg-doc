<template>
  <div class="field-block__wrapper">
    <textarea 
      :id="inputId"
      v-model="inputVal"
      :required="required"
      :name ="'Field_'+inputId"
      class="field-block__wrapper_item" 
      row="1"
      @focus="toggleLabel($event)"
      @blur="toggleLabel($event)"
      @keyup="searchData($event)"/>
    <div 
      class="likePlaceholder "
      v-text="rusDesc"/>
    <div class="borderPseudo"/>
  </div>
</template>

<script>
import { likeLabelV, likeLabelOnCreateV, textareaAutoGrow } from './helperScripts.js';
  export default {
    props: {
      rusDesc: {
        type: String,
        default: '',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      inputId: {
        type: [String, Number],
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      inputVal: {
        get() {
          return this.value;
        },
        set( value ) {
          this.$emit( 'input', value );
        },
      },
    },
    created() {
      const component = this;
      this.handler = function( e ) {
        component.$emit( 'keyup', e );
      };
      window.addEventListener( 'keyup', this.handler );
    },
    updated() {
      var thisEl = document.getElementById( this.inputId );
      likeLabelOnCreateV( thisEl );
      textareaAutoGrow();
    },
    mounted() {
      var thisEl = document.getElementById( this.inputId );
      likeLabelOnCreateV( thisEl );
      textareaAutoGrow();
    },
    methods: {
      toggleLabel( e ) {
        likeLabelV( e );
        textareaAutoGrow();
      },
      searchData() {},
    },
  };
</script>
