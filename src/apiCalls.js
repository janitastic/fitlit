const fetchUserData = () => {fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users")
  .then((response) => response.json())
  .then(data => data)} // do things with the data here -- Cass

// let fetchUserData = () => {fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users")
//   .then((response) => response.json())
//   .then(data => data.userData)} // do things with the data here -- Cass
//
// let fetchUserData = () => {fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users")
//   .then((response) => response.json())
//   .then(data => data.userData)} // do things with the data here -- Cass
//
// let fetchUserData = () => {fetch("https://pacific-badlands-43237.herokuapp.com/api/v1/users")
//   .then((response) => response.json())
//   .then(data => data.userData)} // do things with the data here -- Cass

module.exports = fetchUserData;
