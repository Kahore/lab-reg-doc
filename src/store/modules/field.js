import $ from 'jquery';
import { fixJSON, fixField } from '../../scripts/shared';
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
    SignerData:[],
    OnboardingPersons:[]
  },
  Lists: [],
  loadingField: false,
  attachmentListOnAction: false,
  signerListOnAction: false
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
  GET_DataFiles: state => {
    return state.DocumentInfo.DataFiles;
  },
  GET_Signers: state => { 
    return state.DocumentInfo.SignerData;
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
  OnProgress_Attachment: ( state ) => {
    state.attachmentListOnAction = !state.attachmentListOnAction;
  },
  OnProgress_Attachment_Single: ( state, payload ) => {
    let index = state.DocumentInfo.DataFiles.findIndex( function ( block ) {
      return block.DocFileId === payload.DocFileId;
    } );
    if ( state.DocumentInfo.DataFiles[index].onAction === 'true' ) {
      state.DocumentInfo.DataFiles[index].onAction = 'false';
    } else {
      state.DocumentInfo.DataFiles[index].onAction === 'true';
    }
  },
  OnProgress_Signer: ( state ) => {
    state.signerListOnAction = !state.signerListOnAction;
  },
  OnProgress_Signer_Single: ( state, payload ) => {
    let index = state.DocumentInfo.SignerData.findIndex( function ( block ) {
      return block.ID === payload.SignerID;
    } ); 
    if( index !== -1 ) {
      if( state.DocumentInfo.SignerData[index].onAction === 'true' ) {
        state.DocumentInfo.SignerData[index].onAction = 'false';
      } else {
        state.DocumentInfo.SignerData[index].onAction = 'true';
      }
    }
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
  },
  MUTATE_FILE_LOADNEW: ( state, payload ) => {
    for ( let i = 0; i < payload.length; i++ ) {
      let index = state.DocumentInfo.DataFiles.findIndex( function ( block ) {
        return block.DocFileId === payload[i].DocFileId;
      } );
      if ( index === -1 ) {
        state.DocumentInfo.DataFiles.unshift( payload[i] );
      }
    }
  },
  MUTATE_FILE_DELETE: ( state, payload ) => {
    let _index =  state.DocumentInfo.DataFiles.findIndex( function ( block ) {
      return block.DocFileId === payload.DocFileId;
    } );
    if ( _index !== -1 ) {
      state.DocumentInfo.DataFiles.splice( _index, 1 );
    }
  },
  MUTATE_SIGNER_ADD: ( state, payload ) => {
    state.DocumentInfo.SignerData.unshift( payload );
  },
  MUTATE_SIGNER_DELETE: ( state, payload ) => {
    let _index =  state.DocumentInfo.SignerData.findIndex( function ( block ) {
      return block.ID === payload.SignerID;
    } );
    if ( _index !== -1 ) {
      state.DocumentInfo.SignerData.splice( _index, 1 );
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
  },
  MUTATE_FILE_UPLOAD: ( { commit }, payload ) => {
    return new Promise( function ( resolve, reject ) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function () {
        if ( httpRequest.readyState === 4 && httpRequest.status === 200 ) {
          /* eslint-disable-next-line no-console */
          console.log( 'status 200' );
        } else if (
          httpRequest.readyState === 4 &&
          httpRequest.status === 500
        ) {
          commit( 'SET_ERROR', httpRequest.status + ' ' + httpRequest.statusText + '(Внутренняя ошибка сервера)' );
        } else if (
          httpRequest.readyState === 4 &&
          httpRequest.status === 401
        ) {
          commit( 'SET_ERROR', httpRequest.status + ' ' + httpRequest.statusText + '(Внутренняя ошибка сервера)' );
          reject();
        }
      };
      httpRequest.open( 'POST', './GetPageText.ashx', true );
      httpRequest.send( payload );
      resolve();
      /*TEST*/
        /*
        resolve();
        */
    } );
  },
  MUTATE_FILE_LOADNEW: ( { commit }, payload ) => {
    commit( 'OnProgress_Attachment' );
    setTimeout( () => {
      return new Promise( function ( resolve, reject ) {
      /* AJAX tested in NKReports */
        $.ajax( {
          url: './GetPageText.ashx?Id=@Nav_Backend@',
          type: 'GET',
          data: { PARAM: 'Document', PARAM2: 'Document_UploadingFile_Load', unid: payload },
          complete: function ( resp ) {
            if ( resp.response.length !== 0 ) {
              let newline = String.fromCharCode( 13, 10 );
              resp.response = resp.response.replace( /'\\n'/g, newline );
              let myDataParse = JSON.parse( resp.response );
              commit( 'MUTATE_FILE_LOADNEW', myDataParse );
            }
            commit( 'OnProgress_Attachment' );
            resolve( resp );
          },
          error: function ( resp ) {
            commit( 'SET_ERROR', resp.statusText );
            commit( 'OnProgress_Attachment' );
            reject();
          }
        } );
        /*TEST*/
        /*
          let resp = '[ {"DocFileId":"ED0FADCB-B97C-489C-87EC-2CE6295C4EDF","FileName":"РАСПОРЯЖЕНИЕ НЛ от 13052019 39.docx","UploadedInfo":"13.05.2019 07:02:35   ludmila_smolko","onAction":"false","linkToDoc":"./FileDownload.ashx?Id=ED0FADCB-B97C-489C-87EC-2CE6295C4EDF"}]';
          let myDataParse = JSON.parse( resp );
          commit( 'MUTATE_FILE_LOADNEW', myDataParse );
          resolve( resp );
          */
      } );
    }, 2000 );
  },
  MUTATE_FILE_DELETE: ( { commit }, payload ) => {
    /* AJAX tested in NKReports */
    commit( 'OnProgress_Attachment_Single', payload );
    $.ajax( {
      type: 'POST',
      url: './GetPageText.ashx?Id=@Nav_Backend@',
      data: { 
              PARAM: 'Document', 
              PARAM2: 'Document_UploadingFile_Change', 
              PARAM3: 'Document_UploadingFile_Delete', 
              FileID: payload.DocFileId,
              unid: payload.unid
            },
      success: function ( resp ) {
        if ( resp.length === 0 ) {
          commit( 'MUTATE_FILE_DELETE', payload );
        } else {
          commit( 'SET_ERROR', JSON.parse( resp )[0].ErrorMsg );
          commit( 'OnProgress_Attachment_Single', payload );
        }
      },
      error: function ( resp ) {
        commit( 'SET_ERROR', resp.statusText );
        commit( 'OnProgress_Attachment_Single', payload );
      }
    } );
    /*TEST*/
    /*
      commit( 'MUTATE_FILE_DELETE', payload );
    */
  },
  MUTATE_SIGNER_ADD: ( { commit }, payload ) => {
    /* TODO: AJAX */
    let resp = {
                'ID': _generateUNID(),
                'SignerName': payload.EmployeeName,
                'onAction': 'false',
                'AddBy': getDate() + ' Test User Name&Surn'
              };
    commit ( 'MUTATE_SIGNER_ADD', resp );
  },
  MUTATE_SIGNER_DELETE: ( { commit }, payload ) => { 
    commit( 'OnProgress_Signer_Single', payload );
    /* TODO: AJAX */
    setTimeout( () => {
      commit( 'OnProgress_Signer_Single', payload );
      commit( 'MUTATE_SIGNER_DELETE', payload );
    }, 2000 );
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
