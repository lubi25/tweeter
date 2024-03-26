$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    var charCount = $(this).val().length;
    var remainingChars = 140 - charCount;
    $(this).closest('form').find('.counter').text(remainingChars);
  });
});
