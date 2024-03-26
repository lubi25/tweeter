$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    let charCount = $(this).val().length;
    let remainingChars = 140 - charCount;
    let counter = $(this).closest('form').find('.counter')
    
    counter.text(remainingChars);
  });
});