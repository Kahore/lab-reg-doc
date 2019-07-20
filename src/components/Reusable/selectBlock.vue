<template>
  <div class="field-block__wrapper">
    <select
      :id="selectId"
      v-model="currentItem"
      :required="required"
      :name ="'Field_'+selectId"
      class="field-block__wrapper_item"
      @focus="toggleLabel($event)"
      @blur="toggleLabel($event)">
      <option 
        v-if="currentItem"
        :selected="true"> {{ currentItem }} </option>
      <option/>
      <option
        v-for="(itemType, index) in itemTypesPars"
        :value="itemType"
        :key="index">
        {{ itemType }}
      </option>
    </select>
    <div
      class="likePlaceholder"
      v-text="rusDesc"/>
    <div class="borderPseudo"/>
  </div>
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
      selectId: {
        type: [String, Number],
        default: '',
      },
      itemTypes: {
        type: [String, Array],
        default: '',
      },
      required: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      currentItem: {
        get: function() {
          return this.value;
        },
        set: function( value ) {
          if ( typeof this.itemTypesPars !== 'undefined' ) {
            this.$emit( 'input', value );
          }
        },
      },
      itemTypesPars() {
        if ( typeof this.itemTypes !== 'undefined' /* && this.itemTypes.length !== 0 */ ) {
          let itemTypesTemp = this.itemTypes;
          itemTypesTemp = itemTypesTemp.substring( 0, itemTypesTemp.length - 1 ).split( ';' );
          return itemTypesTemp;
        } else {
          return '';
        }
      },
    },
    updated: function() {
      var thisEl = document.getElementById( this.selectId );
      likeLabelOnCreateV( thisEl );
    },
    mounted() {
      var thisEl = document.getElementById( this.selectId );
      likeLabelOnCreateV( thisEl );
    },
    methods: {
      toggleLabel( e ) {
        likeLabelV( e );
      },
    },
  };
</script>
