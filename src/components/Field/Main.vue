<template>
  <section class="field-wrapper">
    <div
      v-if="loading"
      class="bar-wrapper" >
      <div class="bar"/>
    </div>
    <div :class="{ 'field-wrapper__disabled': loading }"/>
    <field-field 
      :field="fieldPrep.Document.Field"
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
          return this.$store.getters.defaultInfo;
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
          aclEgit = this.$store.getters.documentInfo.Document.Field.CanIEditDocument;
          if ( Object.keys( this.$store.getters.documentInfo ).length === 0 ) {
            aclEgit = this.$store.getters.defaultInfo.Document.defaultInfoField.CanIEditDocument;
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
       let id = this.$store.getters.getCurrentUnid;
       this.$store.dispatch ( 'LOAD_DD_LIST' );
       this.$store.dispatch( 'LOAD_DOCUMENT_INFO', id );
     },
  };
</script>