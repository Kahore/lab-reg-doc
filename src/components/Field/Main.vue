<template>
  <section class="field-wrapper">
    <div
      v-if="loading"
      class="bar-wrapper" >
      <div class="bar"/>
    </div>
    <div :class="{ 'field-wrapper__disabled': loading }"/>
    <field-field 
      :field="fieldPrep.Field"
      :editable="canIEdit"/>
    <section v-if="!isANewDoc">
      <field-uploader 
        :data-files="fieldPrep.DataFiles"
        :editable="canIEdit"/>
      <field-signer 
        :signers="fieldPrep.SignerData"
        :editable="canIEdit"/>
      <field-onboadring 
        :onboarding-persons="fieldPrep.OnboardingData"
        :editable="canIEdit"/>
    </section>
  </section>
</template>

<script>
import fieldField from './Field';
import fieldUploader from './Uploader';
import fieldOnboadring from './Onboarding';
import fieldSigner from './Signer';
  export default {
    name: 'FieldMain',
    components: {
      'field-field': fieldField,
      'field-uploader': fieldUploader,
      'field-onboadring': fieldOnboadring,
      'field-signer': fieldSigner,
    },
    computed: {
      fieldPrep() {
        if ( !this.$store.getters.isFieldLoading ) {
          if ( Object.keys( this.$store.getters.documentInfo ).length === 0 ) {
            return this.$store.getters.defaultInfo;
          } else {
            return this.$store.getters.documentInfo;
          }   
        } else {
          return {};
        } 
      },
      loading () {
        return this.$store.getters.isFieldLoading;
      },
      isANewDoc() {
        return this.$store.getters.isANewDoc;
      },
      canIEdit () {
        let aclEgit;
        if ( !this.$store.getters.isFieldLoading ) {
          aclEgit = this.$store.getters.documentInfo.Field.CanIEditDocument;
          if ( Object.keys( this.$store.getters.documentInfo ).length === 0 ) {
            aclEgit = this.$store.getters.defaultInfo.Field.CanIEditDocument;
          }
          if ( aclEgit === 'true' ) {
            return true;
          }
          else {
            return false;
          }
        }
      }
    },
    created() {
       let unid = this.$store.getters.getCurrentUnid;
       this.$store.dispatch( 'LOAD_DOCUMENT_INFO', unid );
     },
  };
</script>