<template>
  <div>
    <h2>Ознакомление с документом</h2>
    <div class="field-container">
      <div class="field-row">
        <div
          v-if="editable" 
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
            <div class="tbl-3Block tbl-noCenterBlock">
              <input
                :disabled="onboardingPerson.IsDisabledChb === 'true' "
                :value="onboardingPerson.ID"
                v-model="onboardingWhoChecked"
                type="checkbox"
                name="chbApproverCheck"
                @click="check($event)"> {{ onboardingPerson.LastChanged }}
            </div>
            <div class="tbl-3Block">
              <template v-if="onboardingPerson.onAction==='true'">
                <lds-loader/>
              </template> 
              <template v-else>
                <input
                  :disabled="onboardingPerson.IsDisabledBtnDel === 'true' "
                  :id="onboardingPerson.ID"
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
      onboardingWhoChecked () {
        /* TODO: Fix it */
        return [];
      }
    }
  };
</script>