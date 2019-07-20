<template>
  <div class="field-block__wrapper">
    <input
      :id="inputId"
      v-model="inputVal"
      :readonly="isReadonly"
      :required="required"
      :name ="'Field_'+inputId"
      class="field-block__wrapper_item"
      @focus="toggleLabel($event)"
      @blur="toggleLabel($event)"
      @keyup="searchData($event)">
    <div 
      class="likePlaceholder" 
      v-text="rusDesc"/>
    <div class="borderPseudo"/>
  </div >
</template>
<script>
import { likeLabelV, likeLabelOnCreateV } from './helperScripts.js';

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
    isReadonly: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    inputVal: {
      get: function() {
        return this.value;
      },
      set: function( value ) {
        this.$emit( 'input', value );
      },
    },
  },
  created: function() {
    const component = this;
    this.handler = function( e ) {
      component.$emit( 'keyup', e );
    };
    window.addEventListener( 'keyup', this.handler );
  },
  updated: function() {
    var thisEl = document.getElementById( this.inputId );
    likeLabelOnCreateV( thisEl );
  },
  mounted() {
    var thisEl = document.getElementById( this.inputId );
    likeLabelOnCreateV( thisEl );
  },
  methods: {
    toggleLabel( e ) {
      likeLabelV( e );
    },
    searchData() {},
  },
};
</script>




