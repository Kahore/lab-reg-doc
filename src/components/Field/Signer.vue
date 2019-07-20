<template>
  <div>
    <h2>Подписант
      <span 
        v-if="!isSignersInDocument"
        class="error">
        - Обязательно для заполнения
      </span>
    </h2>
    <div class="field-container">
      <div class="field-row">
        <div 
          v-show="editable" 
          class="field-block">
          <div class="field-block__wrapper htooltip">
            <input
              id="SearchNewSigner"
              type="text"
              class="field-block__wrapper_item"
              name="SearchNewSignerField"
              placeholder="Поиск на русском среди пользователей">
            <br>
            <span>Вы можете добавить любое количество коллег в случае, когда их подпись требуется на документе.</span> 
            <div 
              id="fixTransform_SearchNewSigner"
              class="likePlaceholder likeLabel"> {{ isSignersInDocument?'Редактировать список':'Добавить утверждающих' }} </div>
            <div class="borderPseudo"/>
            <div 
              id="line_SearchNewSigner" 
              name="lineItTo"/>
          </div>
          <br>
          <br>
        </div>
        <!-- .field-block -->
        <div 
          v-show="isSignersInDocument"
          class="tbl-container" >
          <div class="tbl-header">
            <div class="tbl-3Block">ФИО</div>
            <div class="tbl-3Block">Внесено</div>
            <div class="tbl-3Block">Удалить</div>
          </div>
          <div 
            v-for="( signer, index ) in signers"
            :key="index"
            class="tbl-row">
            <div
              class="tbl-3Block tbl-noCenterBlock"
              v-text="signer.SignerName"/>
            <div 
              class="tbl-3Block"
              v-text="signer.AddBy" />
            <div class="tbl-3Block">
              <template v-if="signer.onAction === 'true'">
                <lds-loader/>
              </template>
              <template v-else>
                <input
                  :disabled="signer.IsNotDisabledBtnDel === 'false' "
                  :id="signer.ID" 
                  :class ="{'disabled': signer.IsNotDisabledBtnDel === 'false' }"
                  class="button"
                  type="button"
                  name="load__btnDeleteOrderTracker"
                  value="Х"
                  title="Удалить"
                  @click="delSigner($event)">
              </template>
            </div>
          </div>
          <!-- .tbl-row -->
        </div>
        <!-- .tbl-container -->
      </div>
      <!-- .field-row -->
    </div>
    <!-- .field-container  -->
  </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui';
window.jQuery = $;
window.$ = $; 
import { autocmpl } from '../../scripts/ajax';
  export default {
    name: 'FieldSigner',
    components: {
      'lds-loader':  () => import( './../LDSLoaded' ),
    },
    props: {
      signers: {
        type: Array,
        default:  () => [],
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      isSignersInDocument () {
        if ( !this.$store.getters.isFieldLoading ) {
          if ( this.signers.length !== 0 ) {
            return true;
          } else {
             return false;
          }
        }
      }
    },
    mounted () {
      var self = this;
      $( '#SearchNewSigner' ).autocomplete( {
        minLength: 3,
        source: function( request, response ) {
          autocmpl( 'Employee', request.term ).then( ( result ) => {
            response( $.map( result, function( item ) {				 	
                let result = item.split( '-' );
                  return {
                    label: result[0],
                    value: result[0],
                    data : item
                  };
            } ) );
          } );
        },
        select: function( event, ui ) {
          self.$store.dispatch( 'CLEAR_ERROR' );
          let employee = ui.item.data.split( ':' );
           // eslint-disable-next-line no-console
          console.log( 'TCL: mounted -> employee', employee[0] );
         let signersList = self.$store.getters.GET_Signers;
         let idx = signersList.findIndex( function ( block ) {
          return block.SignerName === employee[0];
        } );
        if ( idx === -1 ){
          let documentId = self.$store.getters.getCurrentUnid;
          self.$store.dispatch( 'MUTATE_SIGNER_ADD', {
                                                        PARAM: 'Document',
                                                        PARAM2: 'Document_Signer_Change',
                                                        PARAM3: 'Document_Signer_Add',
                                                        EmployeeName: employee[0],
                                                        documentId
                                                      } );
        } else {
            self.$store.dispatch( 'SET_ERROR', 'Подписант уже выбран' );
        }
          $( this ).val( '' );
          return false;	
        }
      } );
    },
    methods: {
      delSigner( e ) {
          let documentId = this.$store.getters.getCurrentUnid;
          this.$store.dispatch( 'MUTATE_SIGNER_DELETE', {
                                                          PARAM: 'Document',
                                                          PARAM2: 'Document_Signer_Change',
                                                          PARAM3: 'Document_Signer_Delete',
                                                          SignerID: e.target.id,
                                                          documentId
                                                        } );
      }
    }
  };
</script>