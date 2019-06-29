<template>
  <section>
    <div
      v-show="loading"
      id="myAwaitLoad"
      class="awaitLoad"
    > Some text </div>
    <field-field :field-prep="fieldPrep"/>
    <field-uploader :data-files="fieldPrep.DataFiles"/>
    <field-signer :signers="fieldPrep.Signers"/>
    <field-onboadring :onboarding-persons="fieldPrep.OnboardingPersons"/>
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