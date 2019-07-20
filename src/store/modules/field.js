import $ from 'jquery';
import { fixField } from '../../scripts/shared';
import { doAjax, doAjax_delete }  from '../../scripts/ajax';
const state = () => ( {
  DocumentInfo: {
    Field: {}
  },
  DefaultInfo: {
   Document: {
    Field: {
      id: '@' + 'id' + '@',
      DocNum: '',
      DocumentDate: '',
      DocumentType: '',
      Location: '',
      DivCode: '',
      DocumentDescribe: '',
      Note: '',
      RegInfo: '',
      LastChangeInfo: '',
      CanIEditDocument: 'true'
    }  
   },
    DataFiles:[],
    SignerData:[],
    OnboardingData:[],
    OnboardingWhoChecked:[],
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
    if ( typeof state.DocumentInfo.DataFiles !== 'undefined' ) {
      return state.DocumentInfo.DataFiles;
    }
  },
  GET_Signers: state => { 
    if ( typeof state.DocumentInfo.SignerData !== 'undefined' ) {
       return state.DocumentInfo.SignerData;
    }
  },
  GET_Onboadring: state => {
    if ( typeof  state.DocumentInfo.OnboardingData !== 'undefined' ) {
      return state.DocumentInfo.OnboardingData;
    }
  },
  GET_ONBOARDING_CHECKED: state => {
    return state.DocumentInfo.OnboardingWhoChecked;
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
    window.history.pushState( '', '', '/' );
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
      state.DocumentInfo.DataFiles[index].onAction = 'true';
    }
  },
  OnProgress_Signer: ( state ) => {
    state.signerListOnAction = !state.signerListOnAction;
  },
  OnProgress_Signer_Single: ( state, payload ) => {
    let index = state.DocumentInfo.SignerData.findIndex( function ( block ) {
      return block.id === payload.id;
    } ); 
    if( index !== -1 ) {
      if( state.DocumentInfo.SignerData[index].onAction === 'true' ) {
        state.DocumentInfo.SignerData[index].onAction = 'false';
      } else {
        state.DocumentInfo.SignerData[index].onAction = 'true';
      }
    }
  },
  OnProgress_Onboarding_Single: ( state, payload ) => {
    let index = state.DocumentInfo.OnboardingData.findIndex( function ( block ) {
      return block.ID === payload.OnboardingID;
    } ); 
    if( index !== -1 ) {
      if( state.DocumentInfo.OnboardingData[index].onAction === 'true' ) {
        state.DocumentInfo.OnboardingData[index].onAction = 'false';
      } else {
        state.DocumentInfo.OnboardingData[index].onAction = 'true';
      }
    }
  },
  LOAD_DD_LIST: ( state, payload ) => {
    if ( typeof payload !== 'undefined' ) {
      state.Lists = payload;
    }
  },
	loadField: ( state, payload ) => {
    if ( typeof payload.Document !== 'undefined' ) {
      state.DocumentInfo = payload;
      if ( typeof payload.Document.Field !== 'undefined' ) {
        if ( typeof payload.Document.Field.id !== 'undefined' ) {
          window.history.pushState( '', '', './?id=' + payload.Document.Field.id );
        }
      }
      if ( typeof payload.OnboardingData !== 'undefined' ) {
        for ( let i = 0; i < payload.OnboardingData.length; i++ ) {
          if ( payload.OnboardingData[i].OnboardingState === 'approved' ) {
            state.DocumentInfo.OnboardingWhoChecked = state.DocumentInfo.OnboardingWhoChecked.concat( payload.OnboardingData[i].id );
          }
        }
      }
    }
	},
  MUTATE_FIELD_SAVE: ( state, payload ) => { 
    state.DocumentInfo.Field = { ...state.DocumentInfo.Field, LastChangeInfo: payload.LastChangeInfo };
    if ( typeof state.DocumentInfo.Field.RegInfo === 'undefined' || state.DocumentInfo.Field.RegInfo === '' ) {
      window.history.pushState( '', '', './?id=' + payload.id );
      let newVal = { RegInfo: payload.RegInfo, DocNum:payload.DocNum };
      state.DocumentInfo.Field = { ...state.DocumentInfo.Field, ...newVal };
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
      return block.id === payload.id;
    } );
    if ( _index !== -1 ) {
      state.DocumentInfo.SignerData.splice( _index, 1 );
    }
  },
  MUTATE_ONBOARDING_ADD: ( state, payload ) => {
    state.DocumentInfo.OnboardingData.unshift( payload );
  },
  MUTATE_ONBOARDING_UPDATE: ( state, payload ) => {
    let index = state.DocumentInfo.OnboardingData.findIndex( function ( block ) {
      return block.ID === payload.ID;
    } );
    /*
    * MEMO: NOT USE THIS ANYWAY!!! -> 
    * state.DocumentInfo.OnboardingData[index] = payload[0];
    */
    state.DocumentInfo.OnboardingData.splice( index, 1 );
    state.DocumentInfo.OnboardingData.splice( index, 0, payload );
    if ( payload.OnboardingState === 'approved' ) {
      state.DocumentInfo.OnboardingWhoChecked.push( payload.ID );
    } else {
      let checkIdx = state.DocumentInfo.OnboardingWhoChecked.indexOf( payload.ID );
      state.DocumentInfo.OnboardingWhoChecked.splice( checkIdx, 1 );
    }
  },
  MUTATE_ONBOARDING_DELETE: ( state, payload ) => {
    let _index =  state.DocumentInfo.OnboardingData.findIndex( function ( block ) {
      return block.ID === payload.OnboardingID;
    } );
    if ( _index !== -1 ) {
      state.DocumentInfo.OnboardingData.splice( _index, 1 );
    }
  }
};

const actions = {
  MUTATE_FIELD_RESET: ( { commit } ) => { 
     commit( 'MUTATE_FIELD_RESET' );
  },
  LOAD_DD_LIST: ( { commit } ) => { 
     doAjax( 'http://localhost:3000/ListData', 'GET', '' ).then( ( result ) => { 
        commit( 'LOAD_DD_LIST', result );
     } );
  },
  LOAD_DOCUMENT_INFO: ( { commit }, payload ) => {
    commit( 'CLEAR_ERROR' );
    let url = 'http://localhost:3000/fieldFiller';
    if( payload !== '@id@' ) {
      url  = 'http://localhost:3000/docInfo/'+ payload;
    }
    return new Promise( function( resolve ) {
        doAjax( url, 'GET', '', 'InProgress_Field' ).then( ( result ) => {
          let _resp = result;
          
          // eslint-disable-next-line no-console
          console.log( 'TCL: result', result );
          
          _resp = fixField( _resp );
            commit( 'loadField', _resp );
              if ( typeof _resp.Document.Field !== 'undefined' ) {
                if ( typeof _resp.Document.Field.id !== 'undefined' ) {
                  commit( 'mutateNewUnid', _resp.Document.Field.id );
                  window.history.pushState( '', '', './?id=' + _resp.Document.Field.id );
                }
              } else {
                commit ( 'MUTATE_FIELD_RESET' );
              }
              resolve( _resp );
        } );
    } );
  },
  MUTATE_FIELD_SAVE: ( { commit }, payload ) => { 
    return new Promise( ( resolve, reject ) => {
      let isNew = payload.id === '@id@' ? true : false;
      let _type = isNew ? 'POST' : 'PUT';
      let url = isNew ? 'http://localhost:3000/documents/' : 'http://localhost:3000/documents/'+payload.id;
     // let urlDI = 'http://localhost:3000/documentInfo/';
      let fakeresp = _fakeServerResp_OnFieldSave ( payload );
        let newData = { id:fakeresp.id, Document:{ Field:{...fakeresp} } };
           newData =JSON.stringify( newData );
      $.ajax( {
        url: url,
        type: _type,
        data: newData,
        contentType: 'application/json; charset=UTF-8',
        complete ( resp ) {
          let _resp = JSON.parse( resp.responseText );
          //let _resp = resp;
          resolve( _resp.id );
          commit( 'mutateNewUnid', _resp.id );
          commit ( 'MUTATE_FIELD_SAVE', _resp.Document.Field );
        },
        error ( resp ) {
          reject();
          commit( 'SET_ERROR', resp.statusText );
        }
      } );

    } );
    /*
    return new Promise( ( resolve, reject ) => {
      const data = payload;
		  const result = doAjax( '@Nav_Backend@', 'GET', data, 'InProgress_Field' ).then( ( result ) => {
			commit( 'mutateNewUnid', result.unid );
      commit ( 'MUTATE_FIELD_SAVE', result );
      resolve(result);
      } );
    } );   
    */
  },
  MUTATE_FILE_UPLOAD: ( { commit }, payload ) => {
    return new Promise( function ( resolve, reject ) {
      var httpRequest = new XMLHttpRequest();
      httpRequest.onreadystatechange = function () {
        if ( httpRequest.readyState === 4 && httpRequest.status === 200 ) {
          /* MEMO: reset selected files */
          document.querySelector( 'input[type=file]' ).value = '';
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
      /* AJAX tested in NKReports */
      /*
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
        */
      const data = { PARAM: 'Document', PARAM2: 'Document_UploadingFile_Load', id: payload };
      doAjax( '@Nav_Backend@', 'GET', data, 'OnProgress_Attachment' ).then( ( result ) => {
        commit( 'MUTATE_FILE_LOADNEW', result );
      }, error => { commit( 'SET_ERROR', error );} );
        /*TEST*/
        /*
          let resp = '[ {"DocFileId":"ED0FADCB-B97C-489C-87EC-2CE6295C4EDF","FileName":"РАСПОРЯЖЕНИЕ НЛ от 13052019 39.docx","UploadedInfo":"13.05.2019 07:02:35   ludmila_smolko","onAction":"false","linkToDoc":"./FileDownload.ashx?Id=ED0FADCB-B97C-489C-87EC-2CE6295C4EDF"}]';
          let myDataParse = JSON.parse( resp );
          commit( 'MUTATE_FILE_LOADNEW', myDataParse );
          resolve( resp );
          */

    }, 2000 );
  },
  MUTATE_FILE_DELETE: ( { commit }, payload ) => {
    /* AJAX tested in NKReports */
    commit( 'OnProgress_Attachment_Single', payload );
    /* v1 */
    // $.ajax( {
    //   type: 'POST',
    //   url: './GetPageText.ashx?Id=@Nav_Backend@',
    //   data: { 
    //           PARAM: 'Document', 
    //           PARAM2: 'Document_UploadingFile_Change', 
    //           PARAM3: 'Document_UploadingFile_Delete', 
    //           FileID: payload.DocFileId,
    //           unid: payload.unid
    //         },
    //   success: function ( resp ) {
    //     if ( resp.length === 0 ) {
    //       commit( 'MUTATE_FILE_DELETE', payload );
    //     } else {
    //       commit( 'SET_ERROR', JSON.parse( resp )[0].ErrorMsg );
    //       commit( 'OnProgress_Attachment_Single', payload );
    //     }
    //   },
    //   error: function ( resp ) {
    //     commit( 'SET_ERROR', resp.statusText );
    //     commit( 'OnProgress_Attachment_Single', payload );
    //   }
    // } );
    /* v2 */
    const data = { 
              PARAM: 'Document', 
              PARAM2: 'Document_UploadingFile_Change', 
              PARAM3: 'Document_UploadingFile_Delete', 
              FileID: payload.DocFileId,
              id: payload.id
            };
      doAjax( '@Nav_Backend@', 'POST', data ).then( () => {
        commit( 'OnProgress_Attachment_Single', payload );
        commit( 'MUTATE_FILE_DELETE', payload );
      }, error => { commit( 'SET_ERROR', error );} );
  },
  MUTATE_SIGNER_ADD: ( { commit }, payload ) => {
    let resp = { 
                'id': _generateUNID(),
                'documentId': payload.documentId,
                'SignerName': payload.EmployeeName,
                'onAction': 'false',
                'AddBy': getDate() + ' Test User Name_Surn'
              };
    const data = JSON.stringify( resp );
    let url = 'http://localhost:3000/SignerData';
    doAjax( url, 'POST', data, 'InProgress_Field' ).then( () => {
      commit ( 'MUTATE_SIGNER_ADD', resp );
    } );
  },
  MUTATE_SIGNER_DELETE: ( { commit }, payload ) => { 
    commit( 'OnProgress_Signer_Single', payload );
    setTimeout( () => {
      doAjax_delete( 'http://localhost:3000/SignerData/', payload.id ).then( () => {
        commit( 'OnProgress_Signer_Single', payload );
        commit( 'MUTATE_SIGNER_DELETE', payload );
      } );
    }, 2000 );
  },
  MUTATE_ONBOARDING_ADD: ( { commit }, payload ) => { 
    let resp = {
                'id': _generateUNID(),
                'documentId': payload.documentId,
                'PersonName': payload.EmployeeName,
                'IsDisabledBtnDel': 'false',
                'IsDisabledChb': 'false',
                'onAction': 'false',
                'OnboardingState': 'pendingApproveByUser',
                'LastChanged': ''
              };
    const data = JSON.stringify( resp );
    let url = 'http://localhost:3000/OnboardingData';
    doAjax( url, 'POST', data, 'InProgress_Field' ).then( () => {
      commit ( 'MUTATE_ONBOARDING_ADD', resp );
    } );
  },
  MUTATE_ONBOARDING_UPDATE: ( { commit }, payload ) => { 
        let resp = {
                'id': payload.id,
                'documentId': payload.documentId,
                'PersonName': payload.EmployeeName,
                'IsDisabledBtnDel': 'true',
                'IsDisabledChb': 'true',
                'onAction': 'false',
                'OnboardingState': 'approved',
                'LastChanged': getDate() + ' Test User Name_Surn'
              };    
      const data = JSON.stringify( resp );
    setTimeout( () => {
      $.ajax( {
        url: 'http://localhost:3000/OnboardingData/'+ payload.id,
        method: 'PUT',
        contentType: 'application/json; charset=UTF-8',
        data: data,
        success ( ) {
          commit( 'MUTATE_ONBOARDING_UPDATE', resp );
        }
      } );
    }, 2000 );
    
  },
  MUTATE_ONBOARDING_DELETE: ( { commit }, payload ) => { 
    commit( 'OnProgress_Onboarding_Single', payload );
    setTimeout( () => {
      doAjax_delete( 'http://localhost:3000/OnboardingData/', payload.id ).then( () => {
        commit( 'OnProgress_Onboarding_Single', payload );
        commit( 'MUTATE_ONBOARDING_DELETE', payload );
      } );
    }, 2000 );
  },
};
function getDate() {
  let date = new Date( Date.now() ).toLocaleString().split( ',' )[0];
  let time = new Date( Date.now() ).toLocaleString().split( ',' )[1];
  return date + time;
}
function _generateUNID() {
  return ( [1e7]+-1e3+-4e3+-8e3+-1e11 ).replace( /[018]/g,c=>( c^crypto.getRandomValues( new Uint8Array( 1 ) )[0]&15 >> c/4 ).toString( 16 ) );
}
/*
 * Imitate  server
 */ 
function _fakeServerResp_OnFieldSave ( payload ) {
  if ( payload.id === '@id@' ) {
      let min = 10; 
      let max = 99;  
      let random = Math.floor( Math.random() * ( +max - +min ) ) + +min;
      let dmin = 1; 
      let dmax = 999;  
      let drandom = Math.floor( Math.random() * ( +dmax - +dmin ) ) + +dmin;
      payload.id = _generateUNID();
      payload.DocNum = 'NK19/RegN'+random+'-'+drandom;
      payload.RegInfo = getDate() + ' Test User Name_Surn';
      payload.LastChangeInfo = getDate() + ' Test User Name_Surn';
  } else {
      payload.LastChangeInfo = getDate() + ' Test User Name_Surn';
  }
  return payload;
}
export default {
  state,
  getters,
  mutations,
  actions,
};
