<template>
  <div>
    <h2>Подписант</h2>
    <div class="field-container">
      <div class="field-row">
        <div class="field-block">
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
        </div><!--fieldBlock -->		
        <br>
        <br>
        <!-- <div class="field-block errorMsg">
          <div class="field-block__wrapper htooltip" >Обязательно для заполнения</div>
        </div> -->
        <div class="tbl-container" v-show="isSignersInDocument">
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
                <span class="awaitWhenLoad">SomeText</span>
              </template>
              <template v-else>
                <input
                  :disabled="signer.IsNotDisabledBtnDel === 'false' "
                  :id="signer.ID" 
                  class="button"
                  type="button"
                  name="load__btnDeleteOrderTracker"
                  value="Х"
                  title="Удалить"
                  @click="delSigner($event)">
              </template>
            </div>
          </div>
        </div> <!-- ContainerForTbl -->
      </div>
      <!--fieldRow -->
    </div>
    <!--fieldContainer -->
  </div>
</template>

<script>
  export default {
    name: 'FieldSigner',
    props: {
      signers: {
        type: Array,
        default:  () => [],
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
    }
  };
</script>