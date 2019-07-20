<template>
  <div>
    <h2>Ознакомление с документом</h2>
    <div class="field-container">
      <div class="field-row">
        <div
          v-show="editable" 
          class="field-block">
          <div class="field-block__wrapper htooltip">
            <input
              id="EmployeeToOnboarding" 
              type="text"
              class="field-block__wrapper_item"
              name="EmployeeToOnboardingField"
              placeholder="Поиск на англ/русском среди пользователей" >
            <br>
            <span>Вы можете добавить любое количество коллег в случае, когда им требуется ознакомиться с документом.</span> 
            <div
              id="fixTransform_EmployeeToOnboarding"
              class="likePlaceholder likeLabel"> {{ isOnboardingInDocument?'Изменить список':'Добавить для ознакомпления' }} </div>
            <div class="borderPseudo"/>
            <div 
              id="line_EmployeeToOnboarding" 
              name="lineItTo"/>
          </div>
          <br>
          <br>
        </div><!-- .field-block -->
        <div 
          v-show="isOnboardingInDocument"
          class="tbl-container" 
        >
          <div class="tbl-header">
            <div class="tbl-3Block">Имя</div>
            <div class="tbl-3Block">Отметка об ознакомлении</div>
            <div class="tbl-3Block">Удалить</div>
          </div>
          <!-- .tbl-header -->
          <div 
            v-for="( onboardingPerson, index ) in onboardingPersons"
            :key="index"
            class="tbl-row">
            <div 
              class="tbl-3Block tbl-noCenterBlock"
              v-text="onboardingPerson.PersonName"/>
            <div class="tbl-3Block tbl-noCenter">
              <input
                :disabled="onboardingPerson.IsDisabledChb === 'true' "
                :value="onboardingPerson.id"
                v-model="onboardingWhoChecked"
                type="checkbox"
                name="chbApproverCheck"
                @click="check($event, onboardingPerson)"> {{ onboardingPerson.LastChanged }}
            </div>
            <div class="tbl-3Block">
              <template v-if="onboardingPerson.onAction==='true'">
                <lds-loader/>
              </template> 
              <template v-else>
                <input
                  :disabled="onboardingPerson.IsDisabledBtnDel === 'true' "
                  :id="onboardingPerson.id"
                  :class ="{'disabled': onboardingPerson.IsDisabledBtnDel === 'true' }"
                  class="tbl-3Block button"
                  value="Х"
                  type="button" 
                  name="load__btnDeleteOnboardingPerson"
                  title="Удалить" 
                  @click="delOnboardingPerson($event)">
              </template> 
            </div>
          </div>
          <!-- .tbl-row -->
        </div>
        <!-- .tbl-container -->
      </div>
      <!-- field-row -->
    </div>
    <!-- .field-container -->
  </div>
</template>

<script>
import $ from 'jquery';
import 'jquery-ui';
window.jQuery = $;
window.$ = $; 
import { autocmpl } from '../../scripts/ajax';
import { transliteration } from '../../scripts/shared';
  export default {
    name: 'FieldOnboarding',
    components: {
      'lds-loader':  () => import( './../LDSLoaded' ),
    },
    props: {
      onboardingPersons: {
        type: Array,
        default: () => [],
      },
      editable: {
        type: Boolean,
        default: false,
      },
    },
    computed:{
      isOnboardingInDocument () {
        if ( !this.$store.getters.isFieldLoading ) {
          if ( this.onboardingPersons.length !== 0 ) {
            return true;
          } else {
             return false;
          }
        }
      },
      onboardingWhoChecked: {
        get: function () {
          return this.$store.getters.GET_ONBOARDING_CHECKED;
        },
        set: function ( value ) {
          this.$emit( 'input', value );
        }
      }
    },
    mounted () {
      var self = this;
      $( '#EmployeeToOnboarding' ).autocomplete( {
        minLength: 3,
        source: function( request, response ) {
          let req = transliteration( request.term.toLowerCase() );
          autocmpl( 'EmployeeEmail', req ).then( ( result ) => {
            response( $.map( result, function( item ) {				 	
                let result = item.split( ':' );
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
         let onboadringList = self.$store.getters.GET_Onboadring;
         let idx = onboadringList.findIndex( function ( block ) {
          return block.PersonName === employee[0];
        } );
        if ( idx === -1 ){
          let documentId = self.$store.getters.getCurrentUnid;
          self.$store.dispatch( 'MUTATE_ONBOARDING_ADD', {
                                                          PARAM3: 'Document_Onboarding_Add',
                                                          EmployeeName: employee[0],
                                                          EmployeeMail: employee[1],
                                                          documentId: documentId
                                                        } );
        } else {
            self.$store.dispatch( 'SET_ERROR', 'Уже выбран для ознакомления' );
        }
          $( this ).val( '' );
          return false;	
        }
      } );
    },
    methods: {
      check ( e, onboardingPerson ) {
        let documentId = this.$store.getters.getCurrentUnid;
        this.$store.dispatch( 'MUTATE_ONBOARDING_UPDATE', {
                                                            PARAM3: 'Document_Onboarding_UpdateState',
                                                            id: e.target.value,
                                                            documentId : documentId,
                                                            EmployeeName: onboardingPerson.PersonName
                                                          } );
      },
      delOnboardingPerson( e ) {
          let documentId = this.$store.getters.getCurrentUnid;
          this.$store.dispatch( 'MUTATE_ONBOARDING_DELETE', {
                                                          PARAM: 'Document',
                                                          PARAM2: 'Document_Onboarding_Change',
                                                          PARAM3: 'Document_Onboarding_Delete',
                                                          id: e.target.id,
                                                          documentId
                                                        } );
      }
    }
  };
</script>