<template>
  <div>
    <h2>Основная информация</h2>
    <div
      id="RegInfo"
      class="field-container"> 
      <div class="field-row">
        <div class="field-block field-block_half">
          <div class="FiCon">
            <input 
              id="clear"
              class="button"
              type="button"
              name="clear"
              value="Новый документ"
              @click="clearAction()">
          </div>
        </div>
        <!-- .field-block  -->
        <div class="field-block field-block_full">
          <div class="field-block__wrapper align-rigth ">
            <span>Начало работы: <span/>{{ fieldPrep.regInfo }}</span><br>
            <span>Последние изменения:<span/>{{ fieldPrep.lastChangeInfo }}</span><br>
          </div>
        </div>
        <!-- .field-block  -->
      </div>
      <!-- .field-row  -->
      <div class="field-row">
        <div class="field-block">
          <div class="field-block__wrapper">
            <input
              id="DocumentNum"
              :value="fieldPrep.docNum"
              type="text"
              class="field-block__wrapper_item boldIt"
              name="DocumentNumField"
              readonly>
            <div 
              id="FixTransform_DocumentNum"
              class="likePlaceholder likeLabel">
              Номер документа
            </div>
          </div>
        </div>
        <!-- .field-block  -->
        <div class="field-block">
          <date-picker
            v-model = "fieldPrep.documentDate"
            date-format = "dd/mm/yy"
            rus-desc = "Дата создания" 
            input-id = "DocumentDate" 
            @update-date = "updateDate($event)" 
          />	
        </div>
        <!-- .field-block  -->
        <div class="field-block">	
          <select-block
            v-model = "fieldPrep.currentType"
            :item-types = "documentTypes"
            rus-desc = "Вид документа" 
            select-id = "DocumentType" 
          />
        </div>
        <!-- .field-block  -->
      </div>
      <!-- .field-row  -->
      <div class="field-row">
        <div class="field-block">
          <select-block 
            v-model = "fieldPrep.currentlocation"
            :item-types = "locations"
            rus-desc = "Локация" 
            select-id = "Location" 
          />
        </div>
        <!-- .field-block -->
        <div class="field-block">
          <select-block
            v-model = "fieldPrep.currentDivCode"
            :item-types = "divCodes"
            rus-desc = "DivCode" 
            select-id = "DivCode" 
          />
        </div>
        <!-- .field-block -->
        <div class="field-block"/><!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div class="field-row">
        <div class="field-block field-block_full">
          <fld-textarea
            v-model = "fieldPrep.docDescribe"
            rus-desc = "Краткое содержание документа" 
            input-id = "DocumentDescribe" 
          />
        </div>
        <!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div class="field-row">
        <div class="field-block field-block_full">
          <fld-textarea
            v-model = "fieldPrep.note"
            rus-desc = "Примечания" 
            input-id = "Note" 
          />
        </div>
        <!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div class="field-row">
        <div class="field-block field-block_full">
          <input 
            type="button"
            class="button align-rigth"
            value="сохранить">
        </div>
        <!-- .field-block -->
      </div>
      <!-- .field-row -->
    </div>
    <!-- .field-container -->
  </div>
</template>

<script>
  export default {
    name: 'FieldField',
    props: {
      fieldPrep: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      // fieldPrep() {
      //   if ( Object.keys( this.$store.getters.documentInfo ).length === 0 ) {
      //     return this.$store.getters.defaultInfo;
      //   } else {
      //     return this.$store.getters.documentInfo;
      //   }
      // },
      documentTypes() {
        if ( this.$store.getters.GET_LIST.length !== 0 ) {
          return this.$store.getters.GET_DD_DocumentTypes;
        }
      },
      locations() {
        if ( this.$store.getters.GET_LIST !== 'undefined' ) {
          return this.$store.getters.GET_DD_Locations;
        }
      },
      divCodes() {
        if ( this.$store.getters.GET_LIST !== 'undefined' ) {
          return this.$store.getters.GET_DD_DivCodes;
        }
      },
    }
  };
</script>