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
const sleepChart = document.getElementById('sleepChart');
const sleepForm = document.getElementById('sleepForm');
const logActivity = document.getElementById('logActivity');
const activityReport = document.getElementById('activityReport');
const activityForm = document.getElementById('activityForm');

let domUpdates = () => {
logWater.addEventListener('click', showWaterForm);
saveWaterBtn.addEventListener('click', captureOunces);
logSleep.addEventListener('click', showSleepForm);
logActivity.addEventListener('click', showActivityForm);

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
