import $ from 'jquery';
const state = () => ( {
  DocumentInfo: {},
  DefaultInfo: {
    unid: '@' + 'unid' + '@',
    docNum: '',
    documentDate: '',
    currentType: '',
    currentlocation: '',
    currentDivCode: '',
    docDescribe: '',
    note: '',
    regInfo: '',
    lastChangeInfo: ''
  },
  Lists: [],
  loading: false
} );

const getters = {
  documentInfo: state => {
    return state.DocumentInfo;
  },
  defaultInfo: state => {
    return state.DefaultInfo;
  },
  isFieldLoading: state => {
    return state.loading;
  },
  GET_LIST: state => {
    return state.Lists;
  },
  GET_DD_DocumentTypes: state => {
    if ( state.Lists.length !== 0 ) {
      return state.Lists.DocumentTypes;
    }
  },
  GET_DD_Locations: state => {
    if ( state.Lists.length !== 0 ) {
      return state.Lists.Locations;
    }
  },
  GET_DD_DivCodes: state => {
    if ( state.Lists.length !== 0 ) {
      return state.Lists.DivCodes;
    }
  },
};

const mutations = {
  MUTATE_FIELD_RESET: ( state ) => {
    state.DocumentInfo = Object.assign( {}, state.DefaultInfo );
    window.history.pushState( '', '', './Default?Id=@Nav_Document@' );
  },
  InProgress_Field: ( state ) => {
    state.loading = !state.payload;
  },
  loadField: ( state, payload ) => {
    if ( typeof payload[0].ListData !== 'undefined' ) {
      state.Lists = payload[0].ListData[0];
    }
    // if ( typeof payload[0].Vessel !== 'undefined' ) {
    //   state.VesselInfo = payload[0].Vessel[0];
    //   window.history.pushState( '', '', './Default?Id=@NavID@&unid=' + payload[0].Vessel[0].Field[0].ID );
    // }
  },
};

const actions = {
  // eslint-disable-next-line no-unused-vars
  LOAD_DOCUMENT_INFO: ( { commit }, payload ) => {
    commit( 'CLEAR_ERROR' );
    commit( 'InProgress_Field' );
    // eslint-disable-next-line no-unused-vars
    return new Promise( function( resolve, reject ) {
      setTimeout( () => {
        $.ajax( {
          url: 'http://localhost:3000/fieldFiller',
          type: 'GET',
          complete ( resp ) {
            let _resp = JSON.parse( resp.responseText );
            commit( 'loadField', _resp );
            commit( 'InProgress_Field' );
             resolve( _resp );
          }
        } );
      }, 2000 );
      // const data = {  PARAM2: 'VesselFieldFiller', PARAM3: payload.PARAM3, unid: payload.unid };
      // const result = doAjax( '@Nav_Backend@', data, 'InProgress_Field' ).then( ( result ) => {
      //   commit( 'loadField', result );
      //   resolve( result );
      // } );
    } );
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
