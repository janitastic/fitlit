import displayCharts from './charts.js';
import currentUser
 from './scripts.js';

let todaysSteps;
let todaysMinutes;
let todaysStairs;


const displayUserInfoCard = (currentUser) => {
  greeting.innerText = `Welcome, ${currentUser.getFirstName()}!`;
  console.log('DOMUpdates line 8>>', currentUser);
};

const displayUserData = (currentUser) => {
  userEmail.innerText = `${currentUser.email}`;
  userAddress.innerText = `${currentUser.address}`;
  userStride.innerText = `${currentUser.strideLength}`;
  userStepGoal.innerText = `${currentUser.dailyStepGoal}`;
  console.log('DOMUpdates line 15>>', currentUser)
};

const displayAvgStepGoal = (userRepository) => {
  avgStepGoal.innerText = `${userRepository.getAvgStepCount()}`;
};


const displaySleepQuality = (userSleep, currentUser, todaysDate) => {
  dailySleepQuality.innerText = userSleep.getDailySleepQual(currentUser, todaysDate);
  avgSleepQuality.innerText = userSleep.getAvgDailySleepQual(currentUser);
  console.log('DOMUpdates line 24>>', currentUser)
};


const displayUserAvgSteps = (userRepository) => {
  avgUserStepsOverview.innerText = userRepository.getAvgStepCount()
}
const displayUserAvgStairs = (currentUser, userActivity) => {
  avgUserStairsOverView.innerText = userActivity.findUserAvgFlights(currentUser)
}

const displayUserAvgMins = (currentUser, userActivity, todaysDate) => {
  avgUserMinutesOverview.innerText = userActivity.getAvgDailyMinsActive(currentUser, todaysDate)
}

const displayUserDailySteps = (currentUser, userActivity, todaysDate) => {
  let numSteps = userActivity.getDailySteps(currentUser, todaysDate);
  userDailySteps.innerText = `${numSteps} out of ${currentUser.dailyStepGoal}`;
  console.log('DOMUpdates line 29>>', currentUser)
};

const displayUserAvgOz = (userh20, currentUser) => {
 avgUserOzOverview.innerText = userh20.getAvgOuncesPerDay(currentUser)
}


const refreshDisplay = (userRepository, userh20, userSleep, userActivity, currentUser, todaysDate) => {
  displayUserInfoCard(currentUser);
  displayUserData(currentUser);
  displayAvgStepGoal(userRepository);
  displaySleepQuality(userSleep, currentUser, todaysDate);
  displayCharts(userh20, userSleep, userActivity, currentUser, todaysDate);
  displayUserDailySteps(currentUser, userActivity, todaysDate);
  displayUserAvgStairs(currentUser,userActivity);
  displayUserAvgMins(currentUser,userActivity,todaysDate);
  displayUserAvgSteps(userRepository);
  displayUserAvgOz(userh20, currentUser);
  console.log(userh20, userSleep, currentUser, todaysDate, currentUser);
}

const captureOunces = () => {
  let todaysOunces;
  if (ouncesInput.value && ouncesInput.value > 0 && ouncesInput.value.length <= 2) {
    todaysOunces = ouncesInput.value
    console.log(todaysOunces)
  } else {
    ouncesInput.value = ''
  }
  return todaysOunces
}
const captureHrsSlept = () => {
  let todaysSleep;
  if (sleepInput.value && sleepInput.value >= 0 && sleepInput.value <= 24) {
    todaysSleep = sleepInput.value
    console.log(todaysSleep)
  } else {
    sleepInput.value = ''
  }
  return todaysSleep;
}
const captureQuality = () => {
  let todaysQuality;
  if (qualityInput.value && qualityInput.value > 0 && qualityInput.value <= 5) {
    todaysQuality = qualityInput.value
    console.log(todaysQuality)
  } else {
    qualityInput.value = ''
    return false
  }
  return todaysQuality
}
const checkActivityInputs = () => {
  if (stepsInput.value && stairsInput.value && minutesInput.value) {
    saveActivityBtn.disabled = false;
  } else {
    clearActivityInputs()
  }
}
const clearActivityInputs = () => {
  stepsInput.value = null
  stairsInput.value = null
  minutesInput.value = null
}
const captureActivity = (currentUser) => {
  console.log('DOMUpdates line 88>>', currentUser);
  checkActivityInputs()
  captureSteps();
  captureStairs();
  captureMinutes();
  console.log('DOMUpdates line 92>>', currentUser);
  // postSleepData(currentUser);
  postActivityData(currentUser);
  // postHydrationData(currentUser);
}

const postSleepData = () => {
  const newSleep = {
    userID: 1,
    date: '2020/01/22',
    hoursSlept: 6,
    sleepQuality: 4
  }
  return fetch('http://localhost:3001/api/v1/sleep', {
      method: 'POST',
      body: JSON.stringify(newSleep),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const postHydrationData = () => {
  const newHydration = {
    userID: 1,
    date: '2020/01/22',
    numOunces: 45
  }
  return fetch('http://localhost:3001/api/v1/hydration', {
      method: 'POST',
      body: JSON.stringify(newHydration),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

const postActivityData = () => {
  console.log('activityData user>>', currentUser);
  const newActivity = {
    userID: 1,
    date: '2020/01/23',
    numSteps: parseInt(todaysSteps),
    minutesActive: parseInt(todaysMinutes),
    flightsOfStairs: parseInt(todaysStairs)
  }
  return fetch('http://localhost:3001/api/v1/activity', {
      method: 'POST',
      body: JSON.stringify(newActivity),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}




const captureSteps = () => {
  if (stepsInput.value && stepsInput.value >= 0 && stepsInput.value < 100000) {
    todaysSteps = stepsInput.value
    console.log(todaysSteps)
  } else {
    stepsInput.value = 0
  }
  console.log('todaysStepsAftrRtn>>', todaysSteps)
  return todaysSteps;
}
const captureStairs = () => {
  if (stairsInput.value && stairsInput.value >= 0 && stairsInput.value <= 8350) {
    todaysStairs = stairsInput.value
    console.log(todaysStairs)
  } else {
    stairsInput.value = null
  }
  return todaysStairs;
}
const captureMinutes = () => {
  if (minutesInput.value && minutesInput.value >= 0 && minutesInput.value <= 1440) {
    todaysMinutes = minutesInput.value
    console.log(todaysMinutes)
  } else {
    minutesInput.value = null
  }
  return todaysMinutes;
}
const displayQualityRange = () => {
  qualityRange.innerText = qualityInput.value
  console.log('slide>>', qualityInput.value);
}
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
const avgUserStepsOverview = document.getElementById('avgUserSteps')
const avgUserOzOverview = document.getElementById('avgUserOz');
//Form Field Query Selectors & Event Listeners
const emptyFieldError = document.getElementById('fieldError');
const logWater = document.getElementById('logWater');
const saveWaterBtn = document.getElementById('saveWaterBtn');
const ouncesInput = document.getElementById('waterIntake');
const waterChart = document.getElementById('waterChart');
const waterForm = document.getElementById('waterForm');
const logSleep = document.getElementById('logSleep');
const saveSleepBtn = document.getElementById('saveSleepBtn');
const saveQualityBtn = document.getElementById('saveQualityBtn');
const qualityInput = document.getElementById('sleepQuality');
const qualityRange = document.getElementById('selectedRange');
const sleepInput = document.getElementById('hoursSlept');
const sleepChart = document.getElementById('sleepChart');
const sleepForm = document.getElementById('sleepForm');
const logActivity = document.getElementById('logActivity');
// const saveStepsBtn = document.getElementById('stepsBtn');
const stepsInput = document.getElementById('stepsTaken');
// const saveStairsBtn = document.getElementById('stairsBtn');
const stairsInput = document.getElementById('stairsClimbed');
// const saveMinutesBtn = document.getElementById('minutesBtn');
const minutesInput = document.getElementById('minsActive')
const saveActivityBtn = document.getElementById('activityBtn');
const activityReport = document.getElementById('activityReport');
const activityForm = document.getElementById('activityForm');
let domUpdates = () => {
  logWater.addEventListener('click', showWaterForm);
  saveWaterBtn.addEventListener('click', captureOunces);
  logSleep.addEventListener('click', showSleepForm);
  saveSleepBtn.addEventListener('click', captureHrsSlept);
  saveQualityBtn.addEventListener('click', captureQuality);
  qualityInput.addEventListener('change', displayQualityRange)
  logActivity.addEventListener('click', showActivityForm);
  saveActivityBtn.addEventListener('click', captureActivity);
  // saveStepsBtn.addEventListener('click', captureSteps);
  // saveStairsBtn.addEventListener('click', captureStairs);
  // saveMinutesBtn.addEventListener('click', captureMinutes);
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
  //FORM FUNCTIONS
  function showWaterForm() {
    toggle(waterChart);
    toggle(waterForm);
  };

  function showSleepForm() {
    toggle(sleepChart);
    toggle(sleepForm);
  };

  function showActivityForm() {
    toggle(activityReport);
    toggle(activityForm);
  };
  // function showError() {
  //   show(emptyFieldError);
  // }
}
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