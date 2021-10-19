class UserRepository {
  constructor(users) {
    this.users = users;
  }

  fetchUserData(userID) {
    const currentUser = this.users.find((user) => {
      return user.id === userID;
    })
    return currentUser
  }
  getAvgStepCount() {
    const totalSteps = this.users.reduce((steps, user) => {
      steps += user.dailyStepGoal
      return steps
    }, 0)
    return Math.floor(totalSteps / this.users.length);
  }
}

// const getRandomIndex = (array) => {
//   return Math.floor(Math.random() * array.length)
// };

// Hi Dannie! Your total steps today so far are xxxxx
  //In comparison, you've taken xyz% amount of steps compared to abc users

export default UserRepository;