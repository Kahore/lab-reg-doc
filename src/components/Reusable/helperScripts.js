export function textareaAutoGrow() {
  var inputs = document.getElementsByTagName( 'textarea' );
  for ( var i = 0; i < inputs.length; i += 1 ) {
    autoGrow( inputs[i] );
  }
}

export function likeLabelV ( e ) {
  e.target.nextSibling.nextSibling.classList.add( 'likeLabel' );
  if ( e.target.value === '' && e.type === 'blur' ) {
    e.target.nextSibling.nextSibling.classList.remove( 'likeLabel' );
  }
  textareaAutoGrow();
  e.target.parentNode.lastElementChild.classList.toggle( 'borderPseudoLine' );
}

export function likeLabelOnCreateV ( elem ) {
  if ( elem.value !== '' ) {
    elem.nextSibling.nextSibling.classList.add( 'likeLabel' );
  }
}

export function autoGrow ( element ) {
  element.style.height = '24px';
  if ( element.value.length > 1 ) {
    element.style.height = element.scrollHeight + 'px';
    if ( element.scrollHeight === 0 ) {
      element.style.height = '24px';
    }
  }
}