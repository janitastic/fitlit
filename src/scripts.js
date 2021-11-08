import Chart from 'chart.js/auto';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import DataHandler from './DataHandler';
// import './css/styles.css';
import './css/index.scss';
import './css/_reset.scss';
import './css/_mixins.scss';

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
  // console.log(allUserData)
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  // console.log('after indexing>>>',allUserData)
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


// const postSleepData = () => {
//   const newSleep = {
//         userID: currentUser.id,
//         date: '2020/01/22',
//         hoursSlept: 6,
//         sleepQuality: 4
//       }
//   return fetch('http://localhost:3001/api/v1/sleep', {
//       method: 'POST',
//       body: JSON.stringify(newSleep),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }
//
//
// const postHydrationData = () => {
//   const newHydration = {
//     userID: currentUser.id,
//     date: '2020/01/22',
//     numOunces: 45
//   }
//   return fetch('http://localhost:3001/api/v1/hydration', {
//       method: 'POST',
//       body: JSON.stringify(newHydration),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }
//
//
// const postActivityData = () => {
//   const newActivity = {
//     userID: currentUser.id,
//     date: '2020/01/22',
//     numSteps: 3400,
//     minutesActive: 130,
//     flightsOfStairs: 17
//   }
//   return fetch('http://localhost:3001/api/v1/activity', {
//       method: 'POST',
//       body: JSON.stringify(newActivity),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }


//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllDataOnLoad();
  // postSleepData();
  // postActivityData();
  // postHydrationData();
});


const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

const getRandomUser = () => {
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  console.log('randomize>>>>', currentUser)
}

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

export {currentUser};
