<template>
  <div 
    id="container" 
    class="container">
    <div id="center">
      <div id="content">
        <span id="ctl00_Content_ctl00_PageText">
          <modal-info/>
          <how-to-use/>
          <field-main/>
          <table-main/>
          <modal-error/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import modalInfo from './components/Modal/Info';
import howToUse from './components/HowToUse';
import modalError from './components/Modal/Error';
import fieldMain from './components/Field/Main';
import tableMain from './components/Table/Table';

export default {
  name: 'App',
  components: {
    'modal-info': modalInfo,
    'how-to-use': howToUse,
    'field-main': fieldMain,
    'table-main': tableMain,
    'modal-error': modalError,
  }
};
</script>

<style>
@import './style/CorpStyle/CorpV2.css';
@import './style/CorpStyle/SGSRapidFramework.css';
@import './style/CorpStyle/jq_ui_1.8.6.css';
@import './style/MyExtStyle.css';
</style>
