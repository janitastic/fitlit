
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


// https://pacific-badlands-43237.herokuapp.com/api/v1/sleep
//  let newSleep = {
//     userID: 1,
//     date: '2020/01/23',
//     hoursSlept: 6,
//     sleepQuality: 4.2
//   }

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
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


const fetchActivityData = () => {
  return fetch("http://localhost:3001/api/v1/activity")
    .then(response => response.json())
};

const fetchHydrationData = () => {
  return fetch("http://localhost:3001/api/v1/hydration")
    .then((response) => response.json())
};


export {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData,
  postSleepData
};