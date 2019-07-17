<template>
  <div 
    id="container" 
    class="container">
    <div id="center">
      <div id="content">
        <span id="ctl00_Content_ctl00_PageText">
          <modal-info/>
          <div class="liftUp" onclick="$(window).scrollTop(0)">
		        <span class="liftUp-msg">Go up!</span>
	        </div>
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
export default {
  name: 'App',
  components: {
    'modal-info': () => import( './components/Modal/Info' ),
    'how-to-use': () => import( './components/HowToUse' ),
    'field-main': () => import( './components/Field/Main' ),
    'table-main': () => import( './components/Table/Table' ),
    'modal-error': () => import( './components/Modal/Error' ), 
  }
};
</script>

<style>
@import './style/CorpStyle/CorpV2.css';
@import './style/CorpStyle/SGSRapidFramework.css';
@import './style/CorpStyle/jq_ui_1.8.6.css';
@import './style/MyExtStyle.css';
</style>
