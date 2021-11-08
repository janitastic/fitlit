import Chart from 'chart.js/auto';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import DataHandler from './DataHandler';
import './css/index.scss';
import './css/_reset.scss';
import displayCharts from './charts.js';
import domUpdates from './domUpdates.js';
import {captureHrsSlept,
  captureQuality,
  captureOunces,
  captureActivity,
  captureMinutes,
  captureStairs,
  captureSteps,
  displayUserInfoCard,
  displayUserData,
  displayAvgStepGoal,
  displaySleepQuality,
  refreshDisplay} from './domUpdates.js';
import './images/add.png';
import './images/add-hover.png';
let data;
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
let todaysDate = '2020/01/22';

domUpdates();

import {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
} from './apiCalls.js';


const fetchAllDataOnLoad = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
    .then(allUserData => parseData(allUserData))
};


const parseData = (allUserData) => {
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  instantiateClasses(userData, sleepData, activityData, h20Data)
};

const instantiateClasses = (users, sleep, activity, h20Data) => {
  userRepository = new UserRepository(users);
  if (currentUser === undefined){
    getRandomUser();
  }
  userSleep = new Sleep(sleep);
  userActivity = new Activity(activity);
  console.log('scripts activity>>',userActivity)
  userh20 = new Hydration(h20Data);
  console.log(">>>>Current User instantiate", currentUser)
  refreshDisplay(userRepository, userh20, userSleep, userActivity, currentUser, todaysDate);
};


//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllDataOnLoad();
});


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

const getRandomUser = () => {
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  console.log('randomize>>>>', currentUser)
}

export {currentUser};
