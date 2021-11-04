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
let allUsersSleep;
const todaysDate = '2020/01/22';

domUpdates()

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
} from './apiCalls.js';

const fetchAllData = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
    .then(allUserData => parseData(allUserData))
};

const parseData = (allUserData) => {
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  allData(userData, sleepData, activityData, h20Data)
};

const allData = (user, sleep, activity, h20Data) => {
  userRepository = new UserRepository(user);
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  allUsersSleep = new Sleep(sleepData)
  userh20 = new Hydration(h20Data);
  displayUserInfoCard(currentUser);
  displayUserData(currentUser);
  displayAvgStepGoal(userRepository);
  displaySleepQuality(allUsersSleep, currentUser, todaysDate);
  displayCharts(userh20, allUsersSleep, currentUser, todaysDate);
};

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData();
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
// //FORM FUNCTIONS
//
// function showWaterForm() {
//   toggle(waterChart);
//   toggle(waterForm);
// };
//
// function showSleepForm() {
//   toggle(sleepChart);
//   toggle(sleepForm);
// };
//
// function showActivityForm() {
//   toggle(activityReport);
//   toggle(activityForm);
// };
