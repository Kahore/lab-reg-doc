<template>
  <section>
    <div
      v-show="loading"
      id="myAwaitLoad"
      class="awaitLoad"
    > Some text </div>
    <field-field/>
    <field-uploader/>
    <field-signer/>
    <field-onboadring/>
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
      loading () {
        return this.$store.getters.isFieldLoading;
      }
    },
    created() {
       this.$store.dispatch( 'LOAD_DOCUMENT_INFO' );
     }
  };
</script>