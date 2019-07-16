import $ from 'jquery';
import 'jquery-ui';
window.jQuery = $;
window.$ = $; 
import { store } from '../store/store';
export function autocmpl( PARAM2, term ) {
  
  // eslint-disable-next-line no-console
  console.log( 'TCL: autocmpl -> term', term );
  /*
    return new Promise( function( resolve, reject ) {
  $.ajax( {
    url: './GetPageText.ashx?Id=@Nav_AutocomplLabRUWS002@',
    dataType: 'json',
    type: 'GET',
    data: {
      term: term,
      PARAM2: PARAM2			   
    },
    success: function( data ) {
      if ( data.responseText.length !== 0 ) {
         resolve( JSON.parse( data.responseText ) );
      } else {
        resolve(data.responseText );
      }
    },
    error: function( data ) {
      self.$store.dispatch( 'SET_ERROR', data.statusText );
    }
  } );
    } );	
  */
 let data;
  if ( PARAM2 === 'EmployeeEmail' ) {
    data = ['ksenia_kolomenko:ksenia.kolomenko@sgs.com',
            'andrey_sokolov:andrey.sokolov@sgs.com',
            'Tatyana_Kolomina:Tatyana.Kolomina@sgs.com',
            'mikhail_kolov:mikhail.kolov@sgs.com',
            'alexander_kolobov:alexander.kolobov@sgs.com',
            'julia_kolomenko:julia.kolomenko@sgs.com'
          ];
  } else {
   data = [
          'Колосов Михаил Александрович',
          'Колодезнов Владимир Владимирович',
          'Колос Анна Александровна',
          'Колов Михаил Григорьевич',
          'Колотовкин Владимир Анатольевич',
          'Колосков Юрий Юрьевич',
          'Коломиец Ирина Андреевна',
          'Колобов Степан Александрович',
          'Коломенко Юлия Владимировна',
          'Колобов Александр Викторович',
          'Колоскова Ольга Вениаминовна',
          'Коломиец Руслан Владимирович',
          'Коломейцев Владимир Андреевич',
          'Колобылин Юрий Михайлович',
          'Колотов Денис Васильевич',
          'Колосов Артем Андреевич',
          'Коломина Татьяна Николаевна',
          'Коломоец Артем Владимирович',
          'Колосовская Наталья Николаевна',
          'Коломин Александр Сергеевич',
          'Колотов Максим Владимирович',
          'Коломенко Ксения Евгеньевна',
          'Колодрубский Олег Вильевич',
          'Колова Светлана Геннадьевна'
        ];
 }

        return data;
}

export function doAjax( url, type, ajaxData, nameLoading ) {
  return new Promise( function( resolve, reject ) {
    try {
      store.dispatch( 'CLEAR_ERROR' );
      _ajaxLoadingHelper( nameLoading );
      $.ajax( {
        url: './GetPageText.ashx?Id=' + url,
        type: type,
        data: ajaxData,
        complete: function( resp ) {
          if ( resp.response.length !== 0 && resp.response !== null ) {
            let _resp = JSON.parse( resp.response );
            if ( typeof _resp.ErrorMsg !== 'undefined' ) {
                store.commit( 'SET_ERROR', _resp.ErrorMsg );
                reject( _resp.ErrorMsg );
                _ajaxLoadingHelper( nameLoading );
            } else {
              resolve( _resp );
              _ajaxLoadingHelper( nameLoading );
            } 
          } else {
             resolve();
             _ajaxLoadingHelper( nameLoading );
          }
        },
        error( resp ) {
          store.commit( 'SET_ERROR', resp.statusText );
          reject( resp.statusText );
          _ajaxLoadingHelper( nameLoading );
        },
      } );
    } catch ( error ) {
      store.commit( 'SET_ERROR', error );
       reject( error );
      _ajaxLoadingHelper( nameLoading );
    }
  } );
}

function _ajaxLoadingHelper( nameLoading ) {
  if ( typeof nameLoading !== 'undefined' ) {
    store.commit( nameLoading );
  }
}