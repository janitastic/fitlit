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

export default UserRepository;
