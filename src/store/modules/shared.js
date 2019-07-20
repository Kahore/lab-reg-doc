const state = () => ( {
  id: _defUNID(),
  error_Msg: '',
  info_Msg: ''
} );

const getters = {
  getCurrentUnid: state => {
    return state.id;
  },
  isANewDoc: state => {
    let id = state.id;
    if ( id === '@' + 'id' + '@' ) {
      return true;
    } else {
      return false;
    }
  },
  GET_ERROR ( state ) {
    if ( state.error_Msg === null ) {
      return '';
    } else {
      return state.error_Msg;
    }
  },
  GET_INFO ( state ) {
    return state.info_Msg;
  }
};

const mutations = {
  mutateNewUnid: ( state, payload ) => {
    state.id = payload;
  },
  SET_ERROR: ( state, payload ) => {
    state.error_Msg = payload;
  },
  CLEAR_ERROR: state => {
    state.error_Msg = null;
  },
  SET_INFO: ( state, payload ) => {
    state.info_Msg = payload;
    setTimeout( () => {
      state.info_Msg = '';
    }, 5000 );
  },
  CLEAR_INFO: state => {
    state.info_Msg = null;
  }
};

const actions = {
  mutateNewUnid: ( { commit }, payload ) => {
    commit( 'mutateNewUnid', payload );
  },
  SET_ERROR ( { commit }, payload ) {
    commit( 'SET_ERROR', payload );
  },
  CLEAR_ERROR ( { commit } ) {
    commit( 'CLEAR_ERROR' );
  },
  SET_INFO ( { commit }, payload ) {
    commit( 'SET_INFO', payload );
  },
  CLEAR_INFO ( { commit } ) {
    commit( 'CLEAR_INFO' );
  }
};
function _defUNID(){
  let url = new URL( window.location.href );
  let id = url.searchParams.get( 'id' );
  id === null ? id = '@'+'id'+'@' : id;
  return id;
}
export default {
  state,
  getters,
  mutations,
  actions,
};
