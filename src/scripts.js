// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********


//Create an info card on the dashboard with all of user’s info on the page
// Display their first name somewhere prominently on the page to welcome them
// For a specific user, display how their step goal compares to the average step goal amongst all users (this display should not be hard-coded)



import Chart from 'chart.js/auto';


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
let allUsersSleep;

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
  allUsersSleep = new Sleep(sleepData)
  userh20 = new Hydration(h20Data);
  //instantiate other classes so data is accessible
  //Repo for each other class?
  displayUserInfoCard();
  displayCharts();
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
const dailySleepQuality = document.getElementById('dailySleepQuality');
const avgSleepQuality = document.getElementById('avgSleepQuality');
//the 3 below are for the water charts, may not need them
  // const userh20Data = document.getElementById('userh20Data');
  // const dailyH20Consumed = document.getElementById('dailyH20Consumed');
  // const weeklyWaterConsumed = document.getElementById('weeklyWaterConsumed');


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
  displaySleepQuality();
  // displayAvgWaterConsumed();
};

const displayUserEmail = () => {
  userEmail.innerText = `${currentUser.email}`;
};

const displayUserAddress = () => {
  userAddress.innerText = `${currentUser.address}`;
};

const displayUserStride = () => {
  userStride.innerText = `${currentUser.strideLength}`;
};

const displayUserDailyStepGoal = () => {
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
};

const displayAvgStepGoal = () => {
  avgStepGoal.innerText = `${userRepository.getAvgStepCount()}`
}

//the function below is currently not doing anything
// const displayAvgWaterConsumed = (id) => {
//   userh20Data.innerText = userh20.getAvgOuncesPerDay(currentUser.id);
//     //we need to figure out how to generate a date for the below argument
//   // dailyH20Consumed.innerText = userh20.calculateDailyOunces(currentUser.id,'2019/06/15');
//   dailyH20Consumed.innerHTML = `<p class="chart-title">Water - ${userh20.calculateDailyOunces(currentUser.id,'2019/06/15')} of 64 oz Goal</p>`;
//   weeklyWaterConsumed.innerText = userh20.calculateWeeklyWater(currentUser.id, '2019/06/15');
// }

const displaySleepQuality = () => {
  dailySleepQuality.innerText = allUsersSleep.getDailySleepQual(currentUser.id, '2020/01/22');
  avgSleepQuality.innerText = allUsersSleep.getAvgDailySleepQual(currentUser.id)
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

/*********** ChartJS integration goes here: ***********/

const displayCharts = () => {
  //WEEKLY WATER
  let weeklyWaterChartData = userh20.calculateWeeklyWater(currentUser.id, '2020/01/22');


  var weeklyWaterChart = document.getElementById('weeklyWaterChart').getContext('2d');

  const weeklyWaterLabels = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
  const weeklyWaterData = {
    labels: weeklyWaterLabels,
    datasets: [{
      label: 'Total Ounces',
      data: weeklyWaterChartData,
      // data: [64, 30, 36, 72, 24, 50, 20],
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
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
        legend: {
          labels: {
            color: ['#FFF']
          }
        }
      },
      indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false
        },
        display: false
        },
      y: {
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          color: ['#FFF'],
        },
      }
    }
  }});

  // DAILY WATER CHART

  var dailyWaterChart = document.getElementById('dailyWaterChart').getContext('2d');

  let dailyWaterChartData = userh20.calculateDailyOunces(currentUser.id, '2020/01/22')


  const dailyWaterData = {
    labels: [''],
    datasets: [{
      label: 'Ounces',
      data: [dailyWaterChartData],
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
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
      x: {
        grid: {
          display: false
        } ,
        display: false
        },
      y: {
        title: false,
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          color: ['#FFF'],
        },
      }
    }
  }});

//AVERAGE WATER

  var totalAvgWaterChart = document.getElementById('avgUserWaterChart').getContext('2d');

  let avgWaterChartData = userh20.getAvgOuncesPerDay(currentUser.id);


  const avgWaterData = {
    labels: [''],
    datasets: [{
      label: 'Average Ounces',
      data: [avgWaterChartData],
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
      data: [64],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1
    }]
  };

  var avgWaterChartBuilder = new Chart(totalAvgWaterChart, {
    type: 'bar',
    data: avgWaterData,
    options: {
      plugins: {
        legend: false
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false
          },
          display: false
          },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
  }});

  // DAILY SLEEP CHART

  var dailySleepChart = document.getElementById('dailySleepChart').getContext('2d');

  let dailySleepChartData = allUsersSleep.getDailyHrsSlept(currentUser.id, '2020/01/22')


  const dailySleepData = {
    labels: [""],
    datasets: [{
      label: 'Time Slept',
      data: [dailySleepChartData],
      backgroundColor: ['rgba(96, 23, 116, 0.4)'],
      borderColor: ['rgb(96, 23, 116)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
      data: [7],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1
    }]
  };

  var dailySleepChartBuilder = new Chart(dailySleepChart, {
    type: 'bar',
    data: dailySleepData,
    options: {
      plugins: {
        legend: false
      },
      indexAxis: 'y',
    scales: {
      x: {
        grid: {
          display: false
        } ,
        display: false
        },
      y: {
        title: false,
        beginAtZero: true,
        stacked: true,
        grid: {
          display: false
        },
        ticks: {
          color: ['#FFF'],
        },
      }
    }
  }});

  //AVERAGE SLEEP

    var totalAvgSleepChart = document.getElementById('avgUserSleepChart').getContext('2d');

    let avgSleepChartData = allUsersSleep.getAvgSleepPerDay(currentUser.id);


    const avgSleepData = {
      labels: [''],
      datasets: [{
        label: 'Time Slept Average',
        data: [avgSleepChartData],
        backgroundColor: ['rgba(96, 23, 116, 0.4)'],
        borderColor: ['rgb(96, 23, 116)'],
        borderWidth: 1,
        order: 1
      }, {
        label: 'Goal',
        data: [7],
        backgroundColor: ['rgba(255, 255, 255, 0.8)'],
        order: 1
      }]
    };

    var avgSleepChartBuilder = new Chart(totalAvgSleepChart, {
      type: 'bar',
      data: avgSleepData,
      options: {
        plugins: {
          legend: false
        },
        indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false
          } ,
          display: false
          },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});

    //WEEKLY SLEEP

    let weeklySleepChartData = allUsersSleep.getWeeklyHrsSlept(currentUser.id, '2020/01/22');
    let weeklySleepQualData = allUsersSleep.getWeeklySleepQual(currentUser.id, '2020/01/22');

    var weeklySleepChart = document.getElementById('weeklySleepChart').getContext('2d');

    const weeklySleepQuality = weeklySleepQualData;
    const weeklySleepData = {
      labels: ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'],
      datasets: [{
        type: 'bar',
        label: 'Time Slept',
        data: weeklySleepChartData,
        backgroundColor: ['rgba(96, 23, 116, 0.4)'],
        borderColor: ['rgb(96, 23, 116)'],
        borderWidth: 1,
        order: 2
      }, {
        type: 'bar',
        label: 'Goal',
        data: [7, 7, 7, 7, 7, 7, 7],
        backgroundColor: ['rgba(255, 255, 255, 0.8)'],
        order: 3
      }, {
        type: 'line',
        label: 'Sleep Quality',
        data: weeklySleepQuality,
        pointRadius: 7,
        pointHoverRadius: 12,
        borderWidth: 8,
        tension: 0.3,
        backgroundColor: ['rgb(96, 23, 116)'],
        order: 1
      }]
    };

    var weeklySleepChartBuilder = new Chart(weeklySleepChart, {
      type: 'bar',
      data: weeklySleepData,
      options: {
        plugins: {
          legend: {
            labels: {
              color: ['#FFF']
            }
          }
        },
        tooltip: {
          mode: 'dataset'
        },
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false
            } ,
            display: false
            },
          y: {
            beginAtZero: true,
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              color: ['#FFF'],
            },
          }
        },
    }});

}
