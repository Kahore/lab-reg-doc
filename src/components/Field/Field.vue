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
          <div class="field-block__wrapper align-right ">
            <span>Начало работы: <span/>{{ fieldPrep.RegInfo }}</span><br>
            <span>Последние изменения:<span/>{{ fieldPrep.LastChangeInfo }}</span><br>
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
              :value="fieldPrep.DocNum"
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
            v-model = "fieldPrep.DocumentDate"
            date-format = "dd/mm/yy"
            rus-desc = "Дата создания" 
            input-id = "DocumentDate" 
            @update-date = "updateDate($event)" 
          />	
        </div>
        <!-- .field-block  -->
        <div class="field-block">
          <select-block 
            v-model = "fieldPrep.Location"
            :item-types = "locations"
            rus-desc = "Локация" 
            select-id = "Location" 
          />
        </div>
        <!-- .field-block  -->
      </div>
      <!-- .field-row  -->
      <div class="field-row">
        <!-- .field-block -->
        <div class="field-block">
          <select-block
            v-model = "fieldPrep.DivCode"
            :item-types = "divCodes"
            rus-desc = "DivCode" 
            select-id = "DivCode" 
          />
        </div>
        <!-- .field-block -->
        <div class="field-block field-block_half">
          <select-block
            v-model = "fieldPrep.DocumentType"
            :item-types = "documentTypes"
            rus-desc = "Вид документа" 
            select-id = "DocumentType" 
          />
        </div><!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div class="field-row">
        <div class="field-block field-block_full">
          <fld-textarea
            v-model = "fieldPrep.DocumentDescribe"
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
            v-model = "fieldPrep.Note"
            rus-desc = "Примечания" 
            input-id = "Note" 
          />
        </div>
        <!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div  
        v-if="editable" 
        class="field-row">
        <div class="field-block field-block_full">
          <input 
            type="button"
            class="button align-right"
            value="сохранить"
            @click="saveAction( fieldPrep )">
        </div>
        <!-- .field-block -->
      </div>
      <!-- .field-row -->
      <div  
        v-else 
        class="field-row ">
        <p class="align-right error">К сожалению, у вас недостаточно прав для этой операции</p>
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
      field: {
        type: Object,
        default: () => {},
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      fieldPrep() {
        if ( typeof this.field !== 'undefined' ) {
          return this.field;
        } else {
          return {};
        }
      },
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
    },
    methods : {
      clearAction () {
        this.$store.dispatch( 'MUTATE_FIELD_RESET' );
        this.$store.dispatch( 'mutateNewUnid', '@'+'unid'+'@' );
      },
      saveAction ( fieldPrep ) {
        let unid = this.$store.getters.getCurrentUnid;
        let dataField;

        dataField = Object.assign( { unid }, fieldPrep );

        dataField = Object.assign( { PARAM: 'Document', PARAM2: 'Document_Save' }, dataField );
        /*
        console.log( 'TCL: saveAction -> unid', unid );
        */
        /*
        console.log( 'TCL: saveAction -> dataField', dataField );
        */
       this.$store.dispatch( 'MUTATE_FIELD_SAVE', dataField ).then( response => {
        this.$store.dispatch( 'LOAD_DOCUMENTS', {
          PARAM: 'Document',
          PARAM2: 'Document_Data',
          PARAM3: 'Document_SingleData',
          DocumentNum: response.DocNum,
          } );
        } );
      },
    }
  };
</script>