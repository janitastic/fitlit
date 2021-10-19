const fetchUserData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users")
    .then((response) => response.json())
} // do things with the data here -- Cass

const fetchSleepData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/sleep")
    .then((response) => response.json())
    .then(data => data)
} // do things with the data here -- Cass

const fetchActivityData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/activity")
    .then((response) => response.json())
    .then(data => data)
} // do things with the data here -- Cass

const fetchHydrationData = () => {
  return fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/hydration")
    .then((response) => response.json())
    .then(data => data)
} // do things with the data here -- Cass

// module.exports = fetchUserData, fetchSleepData, fetchActivityData, fetchHydrationData
export {
  fetchUserData,
  fetchSleepData,
  fetchActivityData,
  fetchHydrationData
}