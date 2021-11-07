
const fetchUserData = () => {
  return fetch("http://localhost:3001/api/v1/users")
    .then((response) => response.json())
    .catch(err => console.log(err))
};

const fetchSleepData = () => {
  return fetch("http://localhost:3001/api/v1/sleep")
    .then((response) => response.json())
    .catch(err => console.log(err))
};

const postSleepData = () => {
  const newSleep = {
    userID: 1,
    date: '2020/01/23',
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
    .then(data => data)
    .catch(err => console.log(err));
}


const fetchActivityData = () => {
  return fetch("http://localhost:3001/api/v1/activity")
    .then(response => response.json())
};

const postActivityData = (userActivity) => {
  const newActivity = {
    userID: 1,
    date: '2020/01/23',
    numSteps: 3400,
    minutesActive: 130,
    flightsOfStairs: 17
  }
  return fetch('http://localhost:3001/api/v1/activity', {
      method: 'POST',
      body: JSON.stringify(newActivity),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log(err));
}

const fetchHydrationData = () => {
  return fetch("http://localhost:3001/api/v1/hydration")
    .then((response) => response.json())
};

const postHydrationData = () => {
  const newHydration = {
    userID: 1,
    date: '2020/01/23',
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
    .then(data => data)
    .catch(err => console.log(err));
}

export {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
  postSleepData,
  postActivityData,
  postHydrationData
};