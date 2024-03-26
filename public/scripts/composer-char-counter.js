$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    let charCount = this.value.length;
    let remainingChars = 140 - charCount;
    let counter = $(this).closest('form').find('.counter')
    
    counter.text(remainingChars);

    if (remainingChars < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');
    }
  });
});
