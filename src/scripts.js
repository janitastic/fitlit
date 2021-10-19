// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

//Create an info card on the dashboard with all of user’s info on the page
// Display their first name somewhere prominently on the page to welcome them
// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)



// import fetchUserData from other JS file

import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
// import userData from './data/users.js';
import activityData from './data/activityData.js';
import sleepData from './data/sleepData.js';
import h20Data from './data/h20Data.js';
let userData;
let userRepository;
let currentUser;

import fetchUserData from './apiCalls.js';

const fetchAllData = () => {
  Promise.all([fetchUserData(), sleepData(), activityData(), h20Data()])
    .then(data => parseData(data))
}

const parseData = (data) => {
  userData = data[0].userData;
  sleepData = data[1].sleepData;
  activityData = data[2].activityData;
  h20Data = data[3].hydrationData;
  allData(userData, sleepData, activityData, h20Data)
}

const allData = (info, sleep, activity, hydration) => {
  const userRepository = new UserRepository(info);
  const currentUser = new User(userRepository.users[10]);
}

// const sleepData = new Sleep(sleepData);
// const activityData = new Activity(activityData);
// const h20Data = new Hydration(h20Data);

// querySelectors go here
const greeting = document.getElementById('firstName');
const userSteps = document.getElementById('userSteps');
const userWater = document.getElementById('userWater');
const userSleep = document.getElementById('userSleep');
const userActivity = document.getElementById('userActivity');
const userEmail = document.getElementById('userEmail');
const userAddress = document.getElementById('userAddress');
const userStride = document.getElementById('userStride');
const userStepGoal = document.getElementById('userStepGoal');

//eventListeners go here
window.addEventListener('load', () => {displayUserInfoCard();});
//helper functions go here

const displayUserInfoCard = () => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`
  displayUserEmail();
  displayUserAddress();
  displayUserStride();
  displayUserDailyStepGoal();
}

const displayUserEmail = () => {
  userEmail.innerText = `email: ${currentUser.email}`
}

const displayUserAddress = () => {
  userAddress.innerText = `address: ${currentUser.address}`
}

const displayUserStride = () => {
  userStride.innerText = `stride length: ${currentUser.strideLength}`
}

const displayUserDailyStepGoal = () => {
  userStepGoal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal}`
}

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file
