import displayCharts from './charts.js';

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

const displaySleepQuality = (allUsersSleep, currentUser, todaysDate) => {
  dailySleepQuality.innerText = allUsersSleep.getDailySleepQual(currentUser.id, todaysDate);
  avgSleepQuality.innerText = allUsersSleep.getAvgDailySleepQual(currentUser.id);
};

const captureOunces = () => {
  let todaysOunces;  
  if (ouncesInput.value && ouncesInput.value > 0 && ouncesInput.value.length <= 2) {
    todaysOunces = ouncesInput.value
  } else {
    ouncesInput.value = ''
  }
  return todaysOunces
}

const captureSleep = () => {
  let todaysSleep;
  if (sleepInput.value && sleepInput.value >= 0 && sleepInput.value <= 24)  {
    todaysSleep = sleepInput.value
    console.log(todaysSleep)
  } else {
    sleepInput.value = ''
  }
  return todaysSleep;
}

const captureQuality = () => {
  let todaysQuality;
  if (qualityInput.value && qualityInput.value >0 && qualityInput.value <= 5)  {
    todaysQuality = qualityInput.value
    console.log(todaysQuality)
  } else {
    qualityInput.value = ''
  }
  return todaysQuality
}

const captureSteps = () => {
  let todaysSteps;
  if (stepsInput.value && stepsInput.value >= 0 && stepsInput.value < 100000)  {
    todaysSteps = stepsInput.value
    console.log(todaysSteps)
  } else {
    stepsInput.value = ''
  }
  return todaysSteps;
}

const captureStairs = () => {
  let todaysStairs;
  if (stairsInput.value && stairsInput.value >= 0 && stairsInput.value <= 8350)  {
    todaysStairs = stairsInput.value
    console.log(todaysStairs)
  } else {
    stairsInput.value = ''
  }
  return todaysStairs;
}

const captureMinutes = () => {
  let todaysMinutes;
  if (minutesInput.value && minutesInput.value >= 0 && minutesInput.value <= 1440)  {
    todaysMinutes = minutesInput.value
    console.log(todaysMinutes)
  } else {
    minutesInput.value = ''
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

//Form Field Query Selectors & Event Listeners
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
const saveStepsBtn = document.getElementById('stepsBtn');
const stepsInput = document.getElementById('stepsTaken');
const saveStairsBtn = document.getElementById('stairsBtn');
const stairsInput = document.getElementById('stairsClimbed');
const saveMinutesBtn = document.getElementById('minutesBtn');
const minutesInput = document.getElementById('minsActive')
const activityReport = document.getElementById('activityReport');
const activityForm = document.getElementById('activityForm');

let domUpdates = () => {
logWater.addEventListener('click', showWaterForm);
saveWaterBtn.addEventListener('click', captureOunces);
logSleep.addEventListener('click', showSleepForm);
saveSleepBtn.addEventListener('click', captureSleep);
saveQualityBtn.addEventListener('click', captureQuality);
qualityInput.addEventListener('change', displayQualityRange)
logActivity.addEventListener('click', showActivityForm);
saveStepsBtn.addEventListener('click', captureSteps);
saveStairsBtn.addEventListener('click', captureStairs);
saveMinutesBtn.addEventListener('click', captureMinutes);

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
}


export default domUpdates;
export {
displayUserInfoCard,
displayUserData,
displayAvgStepGoal,
displaySleepQuality};
