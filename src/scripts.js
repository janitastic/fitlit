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
// import activityData from './data/activityData.js';
// import sleepData from './data/sleepData.js';
// import h20Data from './data/h20Data.js';
let userData;
let sleepData;
let activityData;
let h20Data;
let userRepository;
let currentUser;
let allUsers;

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
} from './apiCalls.js';

const fetchAllData = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
    .then(allUserData => parseData(allUserData))
}

const parseData = (allUserData) => {
  console.log(allUserData);
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  allData(userData, sleepData, activityData, h20Data)
}

const allData = (user, sleep, activity, h20) => {
  userRepository = new UserRepository(user);
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  // userSleep = new Sleep()
  //instantiate other classes so data is accessible
  //Repo for each other class?
  displayUserInfoCard();
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
const avgStepGoal = document.getElementById('avgStepGoal');

//eventListeners go here
window.addEventListener('load', () => {
  fetchAllData();
});
//helper functions go here

const displayUserInfoCard = () => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`
  displayUserEmail();
  displayUserAddress();
  displayUserStride();
  displayUserDailyStepGoal();
  displayAvgStepGoal();
}

const displayUserEmail = () => {
  userEmail.innerText = `Email: ${currentUser.email}`
}

const displayUserAddress = () => {
  userAddress.innerText = `Address: ${currentUser.address}`
}

const displayUserStride = () => {
  userStride.innerText = `Stride Length: ${currentUser.strideLength}`
}

const displayUserDailyStepGoal = () => {
  userStepGoal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal}`

}

const displayAvgStepGoal = () => {
  avgStepGoal.innerText = `Average Community Step Goal: ${userRepository.getAvgStepCount()}`
}

 const getRandomIndex = (array) => {
 return Math.floor(Math.random() * array.length)
 };


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file