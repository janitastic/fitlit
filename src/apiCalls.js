
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
};