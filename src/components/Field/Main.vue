<template>
  <section>
    <!-- <template v-if="loading"> -->
    <div
      v-show="loading"
      id="myAwaitLoad"
      class="awaitLoad"
    > Some text </div>
     <!-- </template>
     <template v-else> -->
    <field-field :field="fieldPrep.Field"/>
    <field-uploader :data-files="fieldPrep.DataFiles"/>
    <field-signer :signers="fieldPrep.SignerData"/>
    <field-onboadring :onboarding-persons="fieldPrep.OnboardingData"/>
    <!-- </template> -->
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
      }
    },
    created() {
       this.$store.dispatch( 'LOAD_DOCUMENT_INFO' );
     }
  };
</script>