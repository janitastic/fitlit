class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.address = userData.address;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    // this.h20Data = userData.h20Data;
    // this.sleepData = userData.sleepData;
    this.friends = userData.friends;
  }

  getFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0]
  }
}



module.exports = User;