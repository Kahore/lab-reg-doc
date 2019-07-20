// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import { store } from './store/store';
import $ from 'jquery';
import 'jquery-ui';
window.jQuery = $;
window.$ = $; 

import datePicker from './components/Reusable/datePicker';
import fldInput from './components/Reusable/fldInput';
import fldText from './components/Reusable/fldTextarea';
import selectBlock from './components/Reusable/selectBlock';
Vue.config.productionTip = false;

Vue.component( 'date-picker', datePicker );
Vue.component( 'fld-input', fldInput );
Vue.component( 'fld-textarea', fldText );
Vue.component( 'select-block', selectBlock );

/* eslint-disable no-new */
new Vue( {
  el: '#app',
  store,
  components: { App },
  template: '<App/>'
} );
