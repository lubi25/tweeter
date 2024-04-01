/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

function createTweetElement(tweetData) {
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
      ${tweetData.content.text}
    </article>
    <footer>
      <span class="tweet-time">
        ${tweetData.created_at}
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

$(document).ready(function() {
  renderTweets(data);
});