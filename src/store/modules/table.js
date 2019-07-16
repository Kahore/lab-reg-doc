import $ from 'jquery';
import { fixJSON } from '../../scripts/shared';
import { CONST_BEGIN } from '../../scripts/shared';
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
    // state.documents = payload;
    if ( payload.blockType === 'Document_SingleData' ) {
      /* MEMO: Изменение информации в нижней таблицу по только что изменённому документу */
      var index = state.documents.findIndex( function ( block ) {
        return block.ID === payload.resp[ 0 ].ID;
      } );
      if ( index !== -1 ) {
        state.documents.splice( index, 1 );
        state.documents.splice( index, 0, payload.resp[ 0 ] );
      } else {
        state.documents.unshift( payload.resp[ 0 ] );
      }
    } else if ( payload.blockType === 'Document_MultiData' ) {
      state.documents = state.documents.concat( payload.resp );
    }
  },
  InProgress_Table: ( state ) => {
    state.loading = !state.loading;
  },
  AllElemIsLoadNow: ( state ) => {
    state.allElemIsLoadNow = !state.allElemIsLoadNow;
  }
};

const actions = {
  LOAD_DOCUMENTS( { commit }, payload ) {
  commit( 'InProgress_Table' );
  setTimeout( () => {
    $.ajax( {
      url: 'http://localhost:3000/documents',
      //data: payload,
      type: 'GET',
      complete ( resp ) {
        let _resp = fixJSON( resp.responseText );
        commit( 'LOAD_DOCUMENTS', { blockType: payload.PARAM3, resp: _resp } );
        commit( 'InProgress_Table' );
          if ( payload.PARAM3 === 'Document_MultiData' && _resp < CONST_BEGIN ) {
            commit( 'AllElemIsLoadNow' );
          }
      },
      error ( resp ) {
        commit( 'SET_ERROR', resp.statusText );
        commit( 'InProgress_Table' );
      }
    } );
  }, 2000 );
    // 	 const data = payload;
		//  const result = doAjax( '@Nav_Backend@', 'GET', data, 'InProgress_Table' ).then( ( result ) => {
    // 	commit( 'LOAD_DOCUMENTS', { blockType: payload.PARAM3, resp: result } );
      //  if ( data.PARAM3 === 'Document_MultiData' && result < CONST_BEGIN ) {
      //    commit( 'AllElemIsLoadNow' );
      //  }
		//  } );
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
