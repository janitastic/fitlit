// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//Create an info card on the dashboard with all of user’s info on the page
// Display their first name somewhere prominently on the page to welcome them
// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)

import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import userData from './data/users.js';
import activityData from './data/activityData.js';
import sleepData from './data/sleepData.js';
import h20Data from './data/h20Data.js';

const user = new User(userData[0]); //error that "User" is not defined
const userRepository = new UserRepository(userData);
// const sleepData = new Sleep(sleepData);
// const activityData = new Activity(activityData);
// const h20Data = new Hydration(h20Data);

// querySelectors go here
const greeting = document.querySelector('#firstName');
const userSteps = document.querySelector('#userSteps');
const userWater = document.querySelector('#userWater');
const userSleep = document.querySelector('#userSleep');
const userActivity = document.querySelector('#userActivity');

//eventListeners go here
window.addEventListener('load', displayName);
//helper functions go here

function displayName() {
  greeting.innerText = `Welcome, ${user.getFirstName()}!`
}
console.log(displayName());
// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
