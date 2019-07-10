import $ from 'jquery';
import { fixJSON } from '../../shared';
const state = () => ( {
  documents:[],
  loading: false,
  allElemIsLoadNow: false
} );

const getters = {
  GET_DOCUMENTS: state => {
    return state.documents;
  },
  isTableLoading: state => {
    return state.loading;
  },
  IsAllElemIsLoadNow: state => {
    return state.allElemIsLoadNow;
  },
};

const mutations = {
  LOAD_DOCUMENTS: ( state, payload ) => {
    state.documents = payload;
  },
  InProgress_Table: ( state ) => {
    state.loading = !state.loading;
  },
};

const actions = {
  LOAD_DOCUMENTS( { commit } ) {
  commit( 'InProgress_Table' );
  setTimeout( () => {
    $.ajax( {
      url: 'http://localhost:3000/documents',
      type: 'GET',
      complete ( resp ) {
        let _resp = fixJSON( resp.responseText );
        commit( 'LOAD_DOCUMENTS', _resp );
        commit( 'InProgress_Table' );
      },
      error ( resp ) {
        commit( 'SET_ERROR', resp.statusText );
        commit( 'InProgress_Table' );
      }
    } );
  }, 2000 );
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
