import displayCharts from './charts.js';
import {currentUser} from './scripts.js';

let todaysSteps;
let todaysMinutes;
let todaysStairs;
let todaysOunces;
let todaysSleep;
let todaysQuality;

const displayUserInfoCard = (currentUser) => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`;
};

const displayUserData = (currentUser) => {
  userEmail.innerText = `${currentUser.email}`;
  userAddress.innerText = `${currentUser.address}`;
  userStride.innerText = `${currentUser.strideLength}`;
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
};

const displayAvgStepGoal = (userRepository) => {
  avgStepGoal.innerText = `${userRepository.getAvgStepCount()}`;
};

const displaySleepQuality = (userSleep, currentUser, todaysDate) => {
  dailySleepQuality.innerText = userSleep.getDailySleepQual(currentUser, todaysDate);
};

const displayUserAvgSteps = (userRepository) => {
  avgUserStepsOverview.innerText = userRepository.getAvgStepCount();
};

const displayUserAvgStairs = (currentUser, userActivity) => {
  avgUserStairsOverView.innerText = userActivity.findUserAvgFlights(currentUser);
};

const displayUserAvgMins = (currentUser, userActivity, todaysDate) => {
  avgUserMinutesOverview.innerText = userActivity.getAvgDailyMinsActive(currentUser, todaysDate);
};

const displayUserDailySteps = (currentUser, userActivity, todaysDate) => {
  let numSteps = userActivity.getDailySteps(currentUser, todaysDate);
  let milesWalked = userActivity.getDailyMiles(currentUser, todaysDate);
  userDailySteps.innerText = `${numSteps} out of ${currentUser.dailyStepGoal}`;
  userDailyMilesWalked.innerText = `${milesWalked}`;
};

const displayUserAvgOz = (userh20, currentUser) => {
  avgUserOzOverview.innerText = userh20.getAvgOuncesPerDay(currentUser);
};

const displayUserAvgHrsSlept = (userSleep, currentUser) => {
  avgUserSleep.innerText = userSleep.getAvgSleepPerDay(currentUser);
};

const displayUserAvgQual = (userSleep, currentUser) => {
  avgUserSleepQual.innerText = userSleep.getAvgDailySleepQual(currentUser);
};

const displayDayMins = (userActivity, currentUser, todaysDate) => {
  dayMinsOverview.innerText = userActivity.getDailyMinsActive(currentUser, todaysDate);
};

const displayDayStairs = (userActivity, currentUser, todaysDate) => {
  dayStairsOverview.innerText = userActivity.getDailyFlights(currentUser, todaysDate);
};

const displayAvgCommActivity = (userActivity, todaysDate) => {
  let numSteps = userActivity.findCommunityAvgSteps(todaysDate);
  let numFlights = userActivity.findCommunityAvgFlights(todaysDate);
  let minsActive = userActivity.findCommunityAvgMinutes(todaysDate);
  avgCommSteps.innerText = `${numSteps}`;
  avgCommStairs.innerText = `${numFlights}`;
  avgCommMinsActive.innerText = `${minsActive} min.`;
};

const displayAvgCommWater = (userh20, todaysDate) => {
  let numOunces = userh20.calculateAvgCommDailyOunces(todaysDate);
  avgCommWater.innerText = `${numOunces} oz.`;
};

const displayAvgCommSleep = (userSleep, todaysDate) => {
  let sleepHrs = userSleep.getAvgCommHrsSlept(todaysDate);
  let sleepQual = userSleep.getAvgAllSleepQual(todaysDate);
  avgCommSleep.innerText = `${sleepHrs} hrs.`;
  avgCommSleepQuality.innerText = `${sleepQual}`;
};

const refreshDisplay = (userRepository, userh20, userSleep, userActivity, currentUser, todaysDate) => {
  displayUserInfoCard(currentUser);
  displayUserData(currentUser);
  displayAvgStepGoal(userRepository);
  displaySleepQuality(userSleep, currentUser, todaysDate);
  displayCharts(userh20, userSleep, userActivity, currentUser, todaysDate);
  displayUserDailySteps(currentUser, userActivity, todaysDate);
  displayUserAvgStairs(currentUser, userActivity);
  displayUserAvgMins(currentUser, userActivity, todaysDate);
  displayUserAvgSteps(userRepository);
  displayUserAvgOz(userh20, currentUser);
  displayUserAvgHrsSlept(userSleep, currentUser);
  displayUserAvgQual(userSleep, currentUser);
  displayDayMins(userActivity, currentUser, todaysDate);
  displayDayStairs(userActivity, currentUser, todaysDate);
  displayAvgCommActivity(userActivity, todaysDate);
  displayAvgCommWater(userh20, todaysDate);
  displayAvgCommSleep(userSleep, todaysDate);

  console.log(userh20, userSleep, currentUser, todaysDate);
};

const captureOunces = (currentUser) => {
  if (ouncesInput.value && ouncesInput.value > 0 && ouncesInput.value.length <= 2) {
    todaysOunces = ouncesInput.value;
  } else {
    ouncesInput.value = '';
  }
  return todaysOunces;
};

const captureHrsSlept = (currentUser) => {
  if (sleepInput.value && sleepInput.value >= 0 && sleepInput.value <= 24) {
    todaysSleep = sleepInput.value;
  } else {
    sleepInput.value = '';
  }
  return todaysSleep;
};

const captureQuality = (currentUser) => {
  if (qualityInput.value && qualityInput.value > 0 && qualityInput.value <= 5) {
    todaysQuality = qualityInput.value;
  } else {
    qualityInput.value = '';
    return false
  }
  return todaysQuality;
};

const clearActivityInputs = () => {
  stepsInput.value = '';
  stairsInput.value = '';
  minutesInput.value = '';
};

const captureActivity = (currentUser) => {
  captureSteps();
  captureStairs();
  captureMinutes();
  postActivityData();
  // clearActivityInputs(); - removed from here so field error would hide
};

const postSleepData = () => {
  const newSleep = {
    userID: currentUser.id,
    date: '2020/01/23',
    hoursSlept: parseInt(todaysSleep),
    sleepQuality: parseInt(todaysQuality),
  }
  return fetch('http://localhost:3001/api/v1/sleep', {
      method: 'POST',
      body: JSON.stringify(newSleep),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
};

const postHydrationData = () => {
  const newHydration = {
    userID: currentUser.id,
    date: '2020/01/23',
    numOunces: parseInt(todaysOunces),
  }
  return fetch('http://localhost:3001/api/v1/hydration', {
      method: 'POST',
      body: JSON.stringify(newHydration),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
};

const postActivityData = () => {
  const newActivity = {
    userID: currentUser.id,
    date: '2020/01/23',
    numSteps: parseInt(todaysSteps),
    minutesActive: parseInt(todaysMinutes),
    flightsOfStairs: parseInt(todaysStairs),
  }
  return fetch('http://localhost:3001/api/v1/activity', {
      method: 'POST',
      body: JSON.stringify(newActivity),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => console.log(data),
      activityMessage.innerHTML = `<p class="success-message">Great work! Keep it up! 🏃🏻</p>`)
    .catch(err => console.log(err))
};

const captureSteps = () => {
  if (stepsInput.value && stepsInput.value >= 0 && stepsInput.value < 100000) {
    todaysSteps = stepsInput.value;
  } else {
    stepsInput.value = null;
  }
  return todaysSteps;
};

const captureStairs = () => {
  if (stairsInput.value && stairsInput.value >= 0 && stairsInput.value <= 8350) {
    todaysStairs = stairsInput.value;
  } else {
    stairsInput.value = null;
  }
  return todaysStairs;
};

const captureMinutes = () => {
  if (minutesInput.value && minutesInput.value >= 0 && minutesInput.value <= 1440) {
    todaysMinutes = minutesInput.value;
  } else {
    minutesInput.value = null;
  }
  return todaysMinutes;
};

const displayQualityRange = () => {
  qualityRange.innerText = qualityInput.value;
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
const userDailySteps = document.getElementById('dailySteps');
const avgUserStairsOverView = document.getElementById('avgUserStairs');
const avgUserMinutesOverview = document.getElementById('avgUserMinsActive');
const avgUserStepsOverview = document.getElementById('avgUserSteps');
const avgUserOzOverview = document.getElementById('avgUserOz');
const avgUserSleep = document.getElementById('avgUserSleep');
const avgUserSleepQual = document.getElementById('avgSleepQuality');
const dayStairsOverview = document.getElementById('flightsOfStairs');
const dayMinsOverview = document.getElementById('activeMinutes');
const userDailyMilesWalked = document.getElementById('dailyMilesWalked');
const avgCommSteps = document.getElementById('avgCommSteps');
const avgCommStairs = document.getElementById('avgCommStairs');
const avgCommMinsActive = document.getElementById('avgCommMinsActive');
const avgCommWater = document.getElementById('avgCommWater');
const avgCommSleep = document.getElementById('avgCommSleep');
const avgCommSleepQuality = document.getElementById('avgCommSleepQuality');
const activityMessage = document.getElementById('activityMessage');
const logWater = document.getElementById('logWater');
const saveWaterBtn = document.getElementById('saveWaterBtn');
const ouncesInput = document.getElementById('waterIntake');
const waterChart = document.getElementById('waterChart');
const waterForm = document.getElementById('waterForm');
const logSleep = document.getElementById('logSleep');
const saveSleepBtn = document.getElementById('saveAllSleepBtn');
const qualityInput = document.getElementById('sleepQuality');
const qualityRange = document.getElementById('selectedRange');
const sleepInput = document.getElementById('hoursSlept');
const sleepChart = document.getElementById('sleepChart');
const sleepForm = document.getElementById('sleepForm');
const logActivity = document.getElementById('logActivity');
const stepsInput = document.getElementById('stepsTaken');
const stairsInput = document.getElementById('stairsClimbed');
const minutesInput = document.getElementById('minsActive');
const saveActivityBtn = document.getElementById('activityBtn');
const activityReport = document.getElementById('activityReport');
const activityForm = document.getElementById('activityForm');
// const activityInputs = document.querySelectorAll('.activity-input').forEach(input => {
//   input.addEventListener('change', disableSaveButton => {
//     if (!stepsInput.value || !stairsInput.value || !minutesInput.value) {
//       saveActivityBtn.disabled = true;
//     } else {
//       saveActivityBtn.disabled = false;
//     }
//   });
// });

let domUpdates = () => {
  ouncesInput.addEventListener('change', () => {
    if (ouncesInput.value) {
      saveWaterBtn.disabled = false;
    } else {
      saveWaterBtn.disabled = true;
    }
  });

  sleepInput.addEventListener('change', () => {
    if (sleepInput.value) {
      saveSleepBtn.disabled = false;
    } else {
      saveSleepBtn.disable = true;
    }
  });

  logWater.addEventListener('click', showWaterForm);
  logWater.addEventListener('keyup', showWaterForm);
  saveWaterBtn.addEventListener('click', () => {
    captureOunces();
    postHydrationData();
    ouncesInput.value = null;
  });

  logSleep.addEventListener('click', showSleepForm);
  logSleep.addEventListener('keyup', showSleepForm);
  saveSleepBtn.addEventListener('click', () => {
    captureHrsSlept();
    captureQuality();
    postSleepData();
    sleepInput.value = null;
    qualityInput.value = null;
    qualityRange.innerText = 3;
  });

  qualityInput.addEventListener('change', displayQualityRange);
  logActivity.addEventListener('click', showActivityForm);
  logActivity.addEventListener('keyup', showActivityForm);
  saveActivityBtn.addEventListener('click', () => {
    captureActivity();
    checkActivityInputs();
  });

  //HELPER FUNCTIONS
  function hide(element) {
    element.classList.add('hidden');
  }

  function show(element) {
    element.classList.remove('hidden');
  }

  function toggle(element) {
    element.classList.toggle('hidden');
  }

  //FORM FUNCTIONS
  function showWaterForm() {
    toggle(waterChart);
    toggle(waterForm);
    saveWaterBtn.disabled = true;
  };

  function showSleepForm() {
    toggle(sleepChart);
    toggle(sleepForm);
    saveSleepBtn.disabled = true;
  };

  function showActivityForm() {
    toggle(activityReport);
    toggle(activityForm);
    // saveActivityBtn.disabled = true;
  };

  function checkActivityInputs() {
    if (!stepsInput.value || !stairsInput.value || !minutesInput.value) {
     show(activityMessage);
     activityMessage.innerHTML = `<p class="error-message">Please complete all fields. 😀</p>`
     clearActivityInputs();
   } else {
     clearActivityInputs();
   }
 };

}; //CLOSING TAG FOR domUpdates - DO NOT DELETE!

export default domUpdates;
export {
  captureHrsSlept,
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
  refreshDisplay
};
