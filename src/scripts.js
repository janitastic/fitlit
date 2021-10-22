// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
<<<<<<< HEAD

//Create an info card on the dashboard with all of user’s info on the page
// Display their first name somewhere prominently on the page to welcome them
// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)



import Chart from 'chart.js/auto';
=======
// import fetchUserData from other JS file
>>>>>>> main

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
let userh20;//added this here trying to populate the avgWaterConsumed

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
  console.log(allUserData);
  userData = allUserData[0].userData;
  sleepData = allUserData[1].sleepData;
  activityData = allUserData[2].activityData;
  h20Data = allUserData[3].hydrationData;
  allData(userData, sleepData, activityData, h20Data)
};

const allData = (user, sleep, activity, h20Data) => {
  userRepository = new UserRepository(user);
  // userId = getRandomIndex(userRepository.users)
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  // currentDate = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  // userSleep = new Sleep()
  userh20 = new Hydration(h20Data);
  //instantiate other classes so data is accessible
  //Repo for each other class?
  displayUserInfoCard();
};

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
const userh20Data = document.getElementById('userh20Data');//can remove this after we figure out how to push this data to a graph
const dailyH20Consumed = document.getElementById('dailyH20Consumed');
const weeklyWaterConsumed = document.getElementById('weeklyWaterConsumed');


//eventListeners go here
window.addEventListener('load', () => {
  fetchAllData();
});
//helper functions go here

const displayUserInfoCard = () => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`;
  displayUserEmail();
  displayUserAddress();
  displayUserStride();
  displayUserDailyStepGoal();
  displayAvgStepGoal();
  displayAvgWaterConsumed();
};

const displayUserEmail = () => {
  userEmail.innerText = `Email: ${currentUser.email}`;
};

const displayUserAddress = () => {
  userAddress.innerText = `Address: ${currentUser.address}`;
};

const displayUserStride = () => {
  userStride.innerText = `Stride Length: ${currentUser.strideLength}`;
};

const displayUserDailyStepGoal = () => {
  userStepGoal.innerText = `Daily Step Goal: ${currentUser.dailyStepGoal}`;
};

const displayAvgStepGoal = () => {
  avgStepGoal.innerText = `Average Community Step Goal: ${userRepository.getAvgStepCount()}`
}

//the function below is currently not doing anything
const displayAvgWaterConsumed = (id) => {
  userh20Data.innerText = userh20.getAvgOuncesPerDay(currentUser.id);
    //we need to figure out how to generate a date for the below argument
  dailyH20Consumed.innerText = userh20.calculateDailyOunces(currentUser.id,'2019/06/15');
  weeklyWaterConsumed.innerText = userh20.calculateWeeklyWater(currentUser.id, '2019/06/15');
}

 const getRandomIndex = (array) => {
 return Math.floor(Math.random() * array.length)
 };


// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';//we can probably take this out


// console.log('This is the JavaScript entry file - your code begins here.');

// An example of how you tell webpack to use a JS file

// ChartJS integration goes here:

var weeklyWaterChart = document.getElementById('myChart').getContext('2d');

const weeklyWaterLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 'Friday', 'Saturday'];
const weeklyWaterData = {
  labels: weeklyWaterLabels,
  datasets: [{
    label: 'Daily Water Consumption',
    data: [64, 30, 36, 72, 24, 50, 20],
    backgroundColor: ['rgba(54, 162, 235, 0.4)'],
    borderColor: ['rgb(54, 162, 235)'],
    borderWidth: 1,
    order: 1
  }, {
    label: "Hydration Goal",
    data: [64, 64, 64, 64, 64, 64, 64],
    backgroundColor: ['rgba(255, 255, 255, 0.8)'],
    order: 1
  }]
};

var weeklyWaterChartBuilder = new Chart(weeklyWaterChart, {
  type: 'bar',
  data: weeklyWaterData,
  options: {
    plugins: {
      legend: false
    },
    indexAxis: 'y',
  scales: {
    y: {
      beginAtZero: true,
      stacked: true
    }
  }
}});

var dailyWaterChart = document.getElementById('dailyWaterChart').getContext('2d');


const dailyWaterData = {
  labels: [""],
  datasets: [{
    label: 'Daily Water Consumption',
    data: [36],
    backgroundColor: ['rgba(54, 162, 235, 0.4)'],
    borderColor: ['rgb(54, 162, 235)'],
    borderWidth: 1,
    order: 1
  }, {
    label: "Hydration Goal",
    data: [64],
    backgroundColor: ['rgba(255, 255, 255, 0.8)'],
    order: 1
  }]
};

var dailyWaterChartBuilder = new Chart(dailyWaterChart, {
  type: 'bar',
  data: dailyWaterData,
  options: {
    plugins: {
      legend: false
    },
    indexAxis: 'y',
  scales: {
    y: {
      title: false,
      beginAtZero: true,
      stacked: true,
      grid: {
        display: false
      }
    }
  }
}});
