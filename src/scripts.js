import Chart from 'chart.js/auto';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import './css/styles.css';
import displayCharts from './charts.js';
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
  displayUserInfoCard();
  displayCharts(userh20, allUsersSleep, currentUser, todaysDate);
};

//QUERY SELECTORS
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
const dailySleepQuality = document.getElementById('dailySleepQuality');
const avgSleepQuality = document.getElementById('avgSleepQuality');

//Form Field Query Selectors
const addWaterBtn = document.getElementById('addWaterBtn');
const waterChart = document.getElementById('waterChart');
const waterForm = document.getElementById('waterForm');

addWaterBtn.addEventListener('click', showWaterForm);

//EVENT LISTENERS
window.addEventListener('load', () => {
  fetchAllData();
});

//HELPER FUNCTIONS
function hide(element) {
  element.classList.add('hidden')
}

function show(element) {
  element.classList.remove('hidden')
}

function toggle(element) {
  element.classList.toggle('hidden');
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

//DATA DISPLAY FUNCTIONS

const displayUserInfoCard = () => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`;
  displayUserData();
  // displayUserEmail();
  // displayUserAddress();
  // displayUserStride();
  // displayUserDailyStepGoal();
  displayAvgStepGoal();
  displaySleepQuality();
};

const displayUserData = () => {
  userEmail.innerText = `${currentUser.email}`;
  userAddress.innerText = `${currentUser.address}`;
  userStride.innerText = `${currentUser.strideLength}`;
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
};

// const displayUserEmail = () => {
//   userEmail.innerText = `${currentUser.email}`;
// };
//
// const displayUserAddress = () => {
//   userAddress.innerText = `${currentUser.address}`;
// };
//
// const displayUserStride = () => {
//   userStride.innerText = `${currentUser.strideLength}`;
// };
//
// const displayUserDailyStepGoal = () => {
//   userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
// };

const displayAvgStepGoal = () => {
  avgStepGoal.innerText = `${userRepository.getAvgStepCount()}`;
};

const displaySleepQuality = () => {
  dailySleepQuality.innerText = allUsersSleep.getDailySleepQual(currentUser.id, todaysDate);
  avgSleepQuality.innerText = allUsersSleep.getAvgDailySleepQual(currentUser.id);
};

//FORM FUNCTIONS & EVENT LISTENERS
// addWaterBtn.addEventListener('click', showWaterForm);

function showWaterForm() {
  toggle(waterChart);
  toggle(waterForm);
};
