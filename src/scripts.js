import Chart from 'chart.js/auto';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import './css/styles.css';
import displayCharts from './charts.js';
import domUpdates from './domUpdates.js';
import {displayUserInfoCard, displayUserData, displayAvgStepGoal, displaySleepQuality} from './domUpdates.js';
import './images/add.png';
import './images/add-hover.png';
let sleepData;
let activityData;
let h20Data;
let userRepository;
let currentUser;
let allUsers;
let userData;
let userh20;
let userSleep;
let userActivity;
let todaysDate = '2020/01/23';

domUpdates();

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
  postSleepData,
  postActivityData,
  postHydrationData
} from './apiCalls.js';


const fetchAllData = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
    .then(allUserData => parseData(allUserData))
};

const parseData = (allUserData) => {
  console.log(allUserData)
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  console.log('after indexing>>>',allUserData)
  instantiateClasses(userData, sleepData, activityData, h20Data)
};

const instantiateClasses = (users, sleep, activity, h20Data) => {
  userRepository = new UserRepository(users);
  console.log('userRepo>>', userRepository.users)
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  console.log('user', currentUser)
  userSleep = new Sleep(sleep);
  userActivity = new Activity(activity);
  userh20 = new Hydration(h20Data);
  displayUserInfoCard(currentUser);
  displayUserData(currentUser);
  displayAvgStepGoal(userRepository);
  displaySleepQuality(userSleep, currentUser, todaysDate);
  displayCharts(userh20, userSleep, currentUser, todaysDate);
};

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData();
  postSleepData();
  postActivityData();
  postHydrationData();
});


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

// //FUNCTIONS FOR USER AVERAGES
//   /*** FYI - pulled the two below from the charts we're removing ***/
//
// // let userAvgSleepHours = allUsersSleep.getAvgSleepPerDay(currentUser.id);
// //
// // let userAvgWater = userh20.getAvgOuncesPerDay(currentUser.id);
//
//
//
// //FUNCTIONS FOR COMMUNITY AVERAGES
//
