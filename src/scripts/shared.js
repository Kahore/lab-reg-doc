export const CONST_COUNT = 0;
export const CONST_BEGIN = 50;

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
  if ( typeof parsedData[0].Document[0].Field.DocDescribe !== 'undefined' ) {
    parsedData[0].Document[0].Field.DocDescribe = parsedData[0].Document[0].Field.DocDescribe.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData[0].Document[0].Field.Note !== 'undefined' ) {
    parsedData[0].Document[0].Field.Note = parsedData[0].Document[0].Field.Note.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData[0].Document[0].DataFiles === 'undefined' ) {
    parsedData[0].Document[0].DataFiles = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData[0].Document[0].DataFiles[0] === 'undefined' ) {
        _tmpArray.push( parsedData[0].Document[0].DataFiles );
        parsedData[0].Document[0].DataFiles = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData[0].Document[0].SignerData === 'undefined' ) {
    parsedData[0].Document[0].SignerData = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData[0].Document[0].SignerData[0] === 'undefined' ) {
        _tmpArray.push( parsedData[0].Document[0].SignerData );
        parsedData[0].Document[0].SignerData = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData[0].Document[0].OnboardingData === 'undefined' ) {
    parsedData[0].Document[0].OnboardingData = [];
  } else {
    /* MEMO: Expected array, not object */
      if ( typeof parsedData[0].Document[0].OnboardingData[0] === 'undefined' ) {
        _tmpArray.push( parsedData[0].Document[0].OnboardingData );
        parsedData[0].Document[0].OnboardingData = _tmpArray;
        _tmpArray = [];
      }
  }
  if ( typeof parsedData[0].Document[0].OnboardingWhoChecked === 'undefined' ) {
    parsedData[0].Document[0].OnboardingWhoChecked = [];
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
