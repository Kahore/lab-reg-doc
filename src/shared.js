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
  if ( typeof parsedData.DocDescribe !== 'undefined' ) {
    parsedData.DocDescribe = parsedData.DocDescribe.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData.Note !== 'undefined' ) {
    parsedData.Note = parsedData.Note.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData.DataFiles === 'undefined' ) {
    parsedData.DataFiles = [];
  }
  if ( typeof parsedData.Signers === 'undefined' ) {
    parsedData.Signers = [];
  }
  if ( typeof parsedData.OnboardingPersons === 'undefined' ) {
    parsedData.OnboardingPersons = [];
  }
  return parsedData;
}
