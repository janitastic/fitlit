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


const fetchAllDataOnLoad = () => {
  Promise.all([fetchUserData(), fetchSleepData(), fetchActivityData(), fetchHydrationData()])
    .then(allUserData => parseData(allUserData))
};



// const postSleepData = () => {
//   const newSleep = {
//     userID: 1,
//     date: '2020/01/23',
//     hoursSlept: 6,
//     sleepQuality: 4
//   }
//   return fetch('http://localhost:3001/api/v1/sleep', {
//       method: 'POST',
//       body: JSON.stringify(newSleep),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => data)
//     .catch(err => console.log(err));
// }


// const postActivityData = () => {
//   return fetch('http://localhost:3001/api/v1/activity', {
//       method: 'POST',
//       body: JSON.stringify(newActivity),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => data)
//     .catch(err => console.log(err));
// }


// const postHydrationData = () => {
//   const newHydration = {
//     userID: 1,
//     date: '2020/01/23',
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
//     .then(data => data)
//     .catch(err => console.log(err));
// }



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
  // console.log('userRepo>>', userRepository.users)
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  // console.log('user', currentUser)
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
  fetchAllDataOnLoad();
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
