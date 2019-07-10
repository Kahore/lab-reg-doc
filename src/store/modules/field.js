import $ from 'jquery';
import { fixJSON, fixField } from '../../shared';
const state = () => ( {
  DocumentInfo: {
    Field: {}
  },
  DefaultInfo: {
    Field: {
      unid: '@' + 'unid' + '@',
      DocNum: '',
      DocumentDate: '',
      DocType: '',
      Location: '',
      DivCode: '',
      DocDescribe: '',
      Note: '',
      RegInfo: '',
      LastChangeInfo: '',
      CanIEditDocument: 'true'
    },
    DataFiles:[],
    Signers:[],
    OnboardingPersons:[]
  },
  Lists: [],
  loadingField: false
} );

const getters = {
  documentInfo: state => {
    return state.DocumentInfo;
  },
  defaultInfo: state => {
    return state.DefaultInfo;
  },
  isFieldLoading: state => {
    return state.loadingField;
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
    state.DocumentInfo = JSON.parse( JSON.stringify( state.DefaultInfo ) );
    window.history.pushState( '', '', './Default?Id=@Nav_Document@' );
  },
  InProgress_Field: ( state ) => {
    state.loadingField = !state.loadingField;
  },
  loadField: ( state, payload ) => {
    if ( typeof payload[0].ListData !== 'undefined' ) {
      state.Lists = payload[0].ListData[0];
    }
    if ( typeof payload[0].Document !== 'undefined' ) {
      state.DocumentInfo = payload[0].Document[0];
      window.history.pushState( '', '', './Default?Id=@Nav_Document@&unid=' + payload[0].Document[0].Field.unid );
    }
  },
  MUTATE_FIELD_SAVE: ( state, payload ) => { 
    state.DocumentInfo.Field.LastChangeInfo = payload.LastChangeInfo;
    if ( state.DocumentInfo.Field.RegInfo === '' ) {
      window.history.pushState( '', '', './Default?Id=@Nav_Document@&unid=' + payload.unid );
      state.DocumentInfo.Field.RegInfo = payload.RegInfo;
      state.DocumentInfo.Field.DocNum = payload.DocNum;
    }
  }
};

      
const actions = {
  MUTATE_FIELD_RESET: ( { commit } ) => { 
     commit( 'MUTATE_FIELD_RESET' );
  },
  // eslint-disable-next-line no-unused-vars
  LOAD_DOCUMENT_INFO: ( { commit }, payload ) => {
    commit( 'CLEAR_ERROR' );
    commit( 'InProgress_Field' );
    // eslint-disable-next-line no-unused-vars
    return new Promise( function( resolve, reject ) {
      setTimeout( () => {
        $.ajax( {
          /* Only DD list */
          //url: 'http://localhost:3000/fieldFiller',
          /* DD + base info w/t signer, file and onboarding */
          //url: 'http://localhost:3000/fieldFillerDocument/',
          /* DD + full document info */
          url: 'http://localhost:3000/fieldFillerDocumentFull',
          type: 'GET',
          complete ( resp ) {
            let _resp = fixJSON( resp.responseText );
            _resp = fixField( _resp );
            commit( 'loadField', _resp );
            if ( typeof _resp[0].Document !== 'undefined' ) {
              commit( 'mutateNewUnid', _resp[0].Document[0].Field.unid );
            } else {
              commit ( 'MUTATE_FIELD_RESET' );
            }
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
  MUTATE_FIELD_SAVE: ( { commit }, payload ) => { 
	return new Promise( ( resolve, reject ) => {
    let _type = payload.unid === '@unid@' ? 'POST' : 'PUT';
    payload = _fakeServerResp ( payload );
    $.ajax( {
      url: 'http://localhost:3000/documents',
      type: _type,
      data: payload,  
      complete ( resp ) {
        let _resp = JSON.parse( resp.responseText );
        //let _resp = resp;
        resolve( resp.unid );
         commit( 'mutateNewUnid', resp.unid );
        commit ( 'MUTATE_FIELD_SAVE', _resp );
      },
      error ( resp ) {
        reject();
        commit( 'SET_ERROR', resp.statusText );
      }
    } );
  } );
  }
};
function getDate() {
  let date = new Date( Date.now() ).toLocaleString().split( ',' )[0];
  let time = new Date( Date.now() ).toLocaleString().split( ',' )[1];
  return date + time;
}
function _generateUNID() {
  return ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace( /[018]/g,c=>( c^crypto.getRandomValues( new Uint8Array( 1 ) )[0]&15 >> c/4 ).toString( 16 ) );
}
function _fakeServerResp ( payload ) {
  if ( payload.unid === '@unid@' ) {
      let min = 10; 
      let max = 99;  
      let random = Math.floor( Math.random() * ( +max - +min ) ) + +min;
      payload.id = random;
      payload.unid = _generateUNID();
      payload.DocNum = 'NK19/RegN00'+random;
      payload.RegInfo = getDate() + ' Test User Name&Surn';
      payload.LastChangeInfo = getDate() + ' Test User Name&Surn';
  } else {
      payload.LastChangeInfo = getDate() + ' Test User Name&Surn';
  }
  return payload;
}
export default {
  state,
  getters,
  mutations,
  actions,
};
