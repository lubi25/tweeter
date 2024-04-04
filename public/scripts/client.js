/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

function createTweetElement(tweetData) {
  const timeAgo = timeago.format(tweetData.created_at); 
  const escapedTweetText = escape(tweetData.content.text);

  let $tweet = `
    <section class="tweet">
    <header>
      <div>
        <div class="tweet-user">
          <img src="${tweetData.user.avatars}">
          <span class="tweet-user-name">${tweetData.user.name}</span>
        </div>
      </div>
      <div class="tweet-handle">
        ${tweetData.user.handle}
      </div>
    </header>
    <article>
      ${escapedTweetText}
    </article>
    <footer>
      <span class="tweet-time">
        ${timeAgo}
      </span>
      <span class="tweet-icons">
        <i class="fa-solid fa-flag"></i> <i class="fa-solid fa-retweet"></i> <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </section>
  `;
  return $tweet;
}

function renderTweets(tweets) {
  tweets.forEach(tweetEntry => {
    const $newTweetEntry = createTweetElement(tweetEntry);
    $('#tweets-container').prepend($newTweetEntry);
  });
}

function postTweet(formData) {
  $.ajax('/tweets', {
    method: "POST",
    data: formData,
    success: function(response) {
      $('#tweet-text').val('');
      console.log('Tweet posted successfully!');
    },
    error: function(xhr, status, error) {
      console.log('An error occurred. Please try again later.');
    }
  });
}

$(document).ready(function() {
  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    var tweetTextArea = $(this).find('textarea[name="text"]');
    var tweetText = tweetTextArea.val().trim();
  
    if (tweetText.length === 0) {
      alert('No tweet submitted!');
    } else if (tweetText.length > 140) {
      alert('Tweet is too long!');
    } else {
      postTweet($(this).serialize());
      loadTweets();

      let counter = $(this).find('.counter');
      counter.text('140');
    }
  });

  function loadTweets() {
    $.ajax('/tweets', {
      method: "GET",
      dataType: "json",
      success: function(receivedTweets) {
        const $tweetsContainer = $('#tweets-container');
        $tweetsContainer.empty();
        renderTweets(receivedTweets);
        console.log('Tweets retrieved!');
      },
      error: function(xhr, status, error) {
        console.log('An error occurred when retrieving tweets. Please try again later.');
      }
    });
  }

  loadTweets();
});