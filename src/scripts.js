import Chart from 'chart.js/auto';
import User from './User';
import UserRepository from './UserRepository';
import Sleep from './Sleep';
import Hydration from './Hydration';
import Activity from './Activity';
import './css/styles.css';
import './images/turing-logo.png';
let sleepData;
let activityData;
let h20Data;
let userRepository;
let currentUser;
let allUsers;
let userh20;
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
  currentUser = new User(userRepository.users[getRandomIndex(userRepository.users)]);
  allUsersSleep = new Sleep(sleepData)
  userh20 = new Hydration(h20Data);
  displayUserInfoCard();
  displayCharts();
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

//EVENT LISTENER
window.addEventListener('load', () => {
  fetchAllData();
});

//HELPER FUNCTIONS
const displayUserInfoCard = () => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`;
  displayUserEmail();
  displayUserAddress();
  displayUserStride();
  displayUserDailyStepGoal();
  displayAvgStepGoal();
  displaySleepQuality();
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

const displaySleepQuality = () => {
  dailySleepQuality.innerText = allUsersSleep.getDailySleepQual(currentUser.id, '2020/01/22');
  avgSleepQuality.innerText = allUsersSleep.getAvgDailySleepQual(currentUser.id)
}

const getRandomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
};

//CHARTJS INTEGRATION
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
        legend: false,
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
    const weeklySleepLabels = weeklySleepQualData;
    const weeklySleepData = {
      labels: weeklySleepLabels,
      datasets: [{
        label: 'Time Slept',
        data: weeklySleepChartData,
        // data: [64, 30, 36, 72, 24, 50, 20],
        backgroundColor: ['rgba(96, 23, 116, 0.4)'],
        borderColor: ['rgb(96, 23, 116)'],
        borderWidth: 1,
        order: 1
      }, {
        label: 'Goal',
        data: [7, 7, 7, 7, 7, 7, 7],
        backgroundColor: ['rgba(255, 255, 255, 0.8)'],
        order: 1
      }]
    };

    var weeklySleepChartBuilder = new Chart(weeklySleepChart, {
      type: 'bar',
      data: weeklySleepData,
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
