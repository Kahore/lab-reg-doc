import $ from 'jquery';
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
  InProgress_Table: ( state, payload ) => {
    state.loading = payload;
  },
};

const actions = {
  LOAD_DOCUMENTS( { commit } ) {
    
    $.ajax( {
      url: 'http://localhost:3000/documents',
      type: 'GET',
      complete ( resp ) {
        let _resp = JSON.parse( resp.responseText );
        commit( 'LOAD_DOCUMENTS', _resp );
      }
    } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
