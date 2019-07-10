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
 *  Fix the crlf in textarea field.
 */
export function fixField ( parsedData ) {
  if ( typeof parsedData.DocDescribe !== 'undefined' ) {
    parsedData.DocDescribe = parsedData.DocDescribe.replace( /\\n/g, '\n' );
  }
  if ( typeof parsedData.Note !== 'undefined' ) {
    parsedData.Note = parsedData.Note.replace( /\\n/g, '\n' );
  }
  return parsedData;
}
