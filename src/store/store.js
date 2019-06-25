import Vue from 'vue';
import Vuex from 'vuex';

import info from './modules/field';
import table from './modules/table';
import shared from './modules/shared';

Vue.use( Vuex );

export const store = new Vuex.Store( {
  modules: {
    shared,
    info,
    table,
  }
} );
