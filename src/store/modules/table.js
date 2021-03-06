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
        return block.id === payload.resp[ 0 ].id;
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
  let url = 'http://localhost:3000/documents?_sort=Document.Field.DocumentDate&_order=desc';
    if ( payload.PARAM3 !== 'Document_MultiData' ) {
      url = 'http://localhost:3000/documents/'+payload.id;
    }
  setTimeout( () => {
    $.ajax( {
      url: url,
      //data: payload,
      type: 'GET',
      complete ( resp ) {
        let _resp = fixJSON( resp.responseText );
        if ( typeof _resp[0] === 'undefined' ) {
          let _tmp = [];
          _tmp.push( _resp );
          _resp = _tmp;
        }
        commit( 'LOAD_DOCUMENTS', { blockType: payload.PARAM3, resp: _resp } );
        commit( 'InProgress_Table' );
          if ( payload.PARAM3 === 'Document_MultiData' && _resp.length < CONST_BEGIN ) {
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
      //  if ( data.PARAM3 === 'Document_MultiData' && result.length < CONST_BEGIN ) {
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
