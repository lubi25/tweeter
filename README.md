# Tweeter Project

Tweeter is a simple, responsive single-page Twitter clone created as a front-end project for Lighthouse Lab's Web Development bootcamp. Users can submit a message of up to 140 characters on the page. Random user information is generated upon form submission and updated on the page with AJAX.

## Features

- **Tweet Validation**: The app validates whether a tweet meets the submission rules (must be fewer than 140 characters).
- **Error Display**: A message with validation errors is displayed upon submission error (e.g., no tweet submitted, message too long).
- **Automatic Tweet Reload**: Existing tweets reload automatically upon submission of a new tweet.

## Final Product
!["Screenshot of layout for desktop"](/docs/tweeter-layout-desktop.png)
!["Screenshot of layout for tablet"](/docs/tweeter-layout-tablet.png)
!["Screenshot of tweet submission form"](/docs/tweet-form.png)
!["Screenshot of submitted tweet"](/docs/tweet-box.png)

## Getting Started

Follow these steps to get Tweeter up and running on your local machine:

1. Clone the repository:
```https://github.com/lubi25/tweeter.git```

2. Dependencies:
- Node.js
- Express
- Body parser
- Chance
- md5

3. Install dependencies:
```npm install```

3. Start the application:
```npm start local```

4. Open your web browser and navigate to `http://localhost:8080` to access Tweeter.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js