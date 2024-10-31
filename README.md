# VibeBuddies

VibeBuddies is a social media platform where users can review and discuss music albums with friends and other users. The platform provides features such as registration, login, posting and commenting on vibechecks, a recommendation feed, and user profile pages.

**Link to try out the app:**:

http://vibebuddies-client.s3-website-us-east-1.amazonaws.com/

---

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)

---

## Features

1. **User Authentication**: Users can register and log in with secure authentication, utilizing JWT tokens to access protected pages.
2. **User Profile and Feed**: Each user has a profile displaying their posted reviews, and a main feed shows activity from friends and the user’s own posts.
3. **vibeChecks**: Users can create vibeChecks which are album reviews that include: rating, text body, and five star rating. Upon creation vibechecks will populate in the global feed and their friends' feeds
4. **Interactive Feed**: Users can interact with posts through likes, dislikes, and comments
5. **Settings and Account Management**: Users can log off, change their password, or delete their account.
6. **Profile**: Users can customize their profiles by adding a profile image, favorite album, favorite artist, favorite song, and bio.

---

## Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)

### Steps

**Clone the repository:**
https://github.com/kofflernick/vibebuddies-client

**install dependencies:**
npm install
Run the application:

**run app:**
npm start

**Usage:**

Access Page:

Toggle between Login and Register options using the navigation at the top of the form.
Register a new account or log in with an existing account.
Upon successful login, you’ll be redirected to the feed.

Feed:

See a list of reviews from friends and your own posts, with options to like, dislike, or comment on each review.
Click on any review to open a detailed modal with the full review text, additional comments, and interaction options.

Profile Page:

Access your profile to view your posted reviews, friends, and update profile information.

Settings:

Change password, delete account, or log off from the settings modal.

**Tech Stack:**
Authentication: JWT
API: Axios for making HTTP requests
State Management: React Context API
