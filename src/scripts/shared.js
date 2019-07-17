export const CONST_COUNT = 0;
export const CONST_BEGIN = 50;
import $ from 'jquery';
window.jQuery = $;
window.$ = $; 
/*
 * Data should be strignify JSON
 * Escape bad symbol and return parsed value
 */
export function fixJSON ( resp ) {
  resp = resp.replace( /\u2022/g, '-' );
  resp = resp.replace( /\t/g, '    ' );
  resp = JSON.parse( resp );
  return resp;
}

/*
 *  Data should be JSON object
 *  Fix the crlf in textarea field
 *  Add missed arrays if they no exist in object
 */
export function fixField ( parsedData ) {
  let _tmpArray = [];
  if ( typeof parsedData.Document.Field.DocumentDescribe !== 'undefined' ) {
    parsedData.Document.Field.DocumentDescribe = parsedData.Document.Field.DocumentDescribe.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData.Document.Field.Note !== 'undefined' ) {
    parsedData.Document.Field.Note = parsedData.Document.Field.Note.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData.Document.DataFiles === 'undefined' ) {
    parsedData.Document.DataFiles = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData.Document.DataFiles[0] === 'undefined' ) {
        _tmpArray.push( parsedData.Document.DataFiles );
        parsedData.Document.DataFiles = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData.Document.SignerData === 'undefined' ) {
    parsedData.Document.SignerData = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData.Document.SignerData[0] === 'undefined' ) {
        _tmpArray.push( parsedData.Document.SignerData );
        parsedData.Document.SignerData = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData.Document.OnboardingData === 'undefined' ) {
    parsedData.Document.OnboardingData = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData.Document.OnboardingData[0] === 'undefined' ) {
        _tmpArray.push( parsedData.Document.OnboardingData );
        parsedData.Document.OnboardingData = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData.Document.OnboardingWhoChecked === 'undefined' ) {
    parsedData.Document.OnboardingWhoChecked = [];
  }
  return parsedData;
}

const wordOption = {
'а': 'a', 
'б': 'b',
'в': 'v',
'г': 'g',
'д': 'd',
'е': 'e',
'ё': 'e',
'ж': 'zh', 
'з': 'z',
'и': 'i',
'й': 'y',
'к': 'k',
'л': 'l',
'м': 'm',
'н': 'n',
'о': 'o',
'п': 'p',
'р': 'r',
'с': 's',
'т': 't',
'у': 'u',
'ф': 'f',
'х': 'kh',
'ц': 'ts',
'ч': 'ch',
'ш': 'sh',
'щ': 'shch',
'ъ': '',
'ы': 'y',
'ь': '',
'э': 'e',
'ю':'u',
'я':'ya'
};
/*антизалипалка*/
export function transliteration( word ){
  let result = '';
  let curent_sim = '';
	for( let i = 0; i < word.length; i++ ) {
    if( wordOption[word[i]] != undefined ) {
      if( curent_sim != wordOption[word[i]] || curent_sim !== ' ' ){
        result += wordOption[word[i]];
        curent_sim = wordOption[word[i]];
      }
    } else {
      result += word[i];
      curent_sim = word[i];
    }
  }

let lastName = result.split( ' ' )[0]; 
/* var firstName = result.split( '' )[1]; */
  result = lastName;
  return result;
}
/* lift implement */
$( function() {
  $( '.liftUp' ).fadeOut();
} );

$( function() {
  $( window ).scroll( function() {
    if ( $( this ).scrollTop() !== 0 ) {
      $( '.liftUp' ).fadeIn();
    } else {
      $( '.liftUp' ).fadeOut();
    }
  } );
} );