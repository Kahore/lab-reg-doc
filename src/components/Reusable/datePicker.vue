<template>
  <div class="field-block__wrapper">
    <input
      :id ="inputId"
      :required="required"
      v-model="inputVal"
      :name ="'Field_'+inputId"
      autocomplete="off"
      class="field-block__wrapper_item"
      @focus="toggleLabel($event)"
      @blur="toggleLabel($event)">
    <div
      class="likePlaceholder"
      v-text="rusDesc"/>
    <div class="borderPseudo"/>
  </div>
</template>

<script>
import { likeLabelV, likeLabelOnCreateV } from './helperScripts.js';
import $ from 'jquery';
import 'jquery-ui';
window.jQuery = $;
window.$ = $;
  export default {
    props: {
      dateFormat: {
        type: String,
        default: 'dd/mm/yy',
      },
      value: {
        type: [String, Number],
        default: '',
      },
      inputId: {
        type: [String, Number],
        default: '',
      },
      rusDesc: {
        type: String,
        default: '',
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
    mounted: function() {
      var self = this;
      var thisEl = document.getElementById( self.inputId );
      $( thisEl ).datepicker( {
        dateFormat: 'dd/mm/yy' /* this.dateFormat */,
        firstDay: 1,
        changeMonth: true,
        changeYear: true,
        onSelect: function( date ) {
          self.$emit( 'input', date );
          if ( date !== '' ) {
            likeLabelOnCreateV( thisEl );
          }
        },
      } );

      likeLabelOnCreateV( thisEl );
      
      $( thisEl ).removeClass( 'hasDatepicker' );
    },
    updated: function() {
      var self = this;
      var thisEl = document.getElementById( self.inputId );
      likeLabelOnCreateV( thisEl );
    },
    beforeDestroy: function() {
      $( this.$el )
        .datepicker( 'hide' )
        .datepicker( 'destroy' );
    },

    methods: {
      toggleLabel( e ) {
        likeLabelV( e );
      },
    },
  };
</script>
