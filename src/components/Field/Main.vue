<template>
  <section class="field-wrapper">
    <div
      v-if="loading"
      class="bar-wrapper" >
      <div class="bar"/>
    </div>
    <div :class="{ 'field-wrapper__disabled': loading }"/>
    <field-field :field="fieldPrep.Field"/>
    <section v-if="!isANewDoc">
      <field-uploader :data-files="fieldPrep.DataFiles"/>
      <field-signer :signers="fieldPrep.SignerData"/>
      <field-onboadring :onboarding-persons="fieldPrep.OnboardingData"/>
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
        let unid = this.$store.getters.getCurrentUnid;
        if ( unid === '@' + 'unid' + '@' ) {
          return true;
        } else {
          return false;
        }
      }
    },
    created() {
       let unid = this.$store.getters.getCurrentUnid;
       this.$store.dispatch( 'LOAD_DOCUMENT_INFO', unid );
     }
  };
</script>