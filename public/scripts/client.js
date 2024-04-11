/* Escape special characters for cross-site scripting */

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


/* Create a new Tweet element with HTML */

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


/* Render new tweets to appear at the top of the tweets container */

function renderTweets(tweets) {
  tweets.forEach(tweetEntry => {
    const $newTweetEntry = createTweetElement(tweetEntry);
    $('#tweets-container').prepend($newTweetEntry);
  });
}


/* Post a new tweet; loadTweets() reloads the tweets once successfully posted */

function postTweet(formData) {
  $.ajax('/tweets', {
    method: "POST",
    data: formData,
    success: function(response) {
      loadTweets();
      $('#tweet-text').val('');
      console.log('Tweet posted successfully!');
    },
    error: function(xhr, status, error) {
      console.log('An error occurred. Please try again later.');
    }
  });
}


/* Load tweets from /tweets */

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


/* Reset character counter to '140' once postTweets is successful */

function counterReset() {
  let counter = $('.counter');
  counter.text('140');
}


/* Initial tweets/page load and event handling for errors while posting tweets */

$(document).ready(function() {
  loadTweets();

  $('.new-tweet form').on('submit', function(e) {
    e.preventDefault();
    let tweetTextArea = $(this).find('textarea[name="text"]');
    let tweetText = tweetTextArea.val().trim();
    let error = $('.error');
  
    if (tweetText.length === 0) {
      $(".error").slideDown(500).addClass("active");
      error.text('Cannot post an empty tweet!');
    } else if (tweetText.length > 140) {
      $(".error").slideDown(500).addClass("active");
      error.text('Tweet is too long!');
    } else {
      $(".error").slideUp(500).removeClass("active");
      postTweet($(this).serialize());
      counterReset();
    }
  });
});