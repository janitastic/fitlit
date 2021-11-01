let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }


  getDailyMiles(user, selectedDate) {
    const userActivityInfo = this.activityData.filter(activityInfo => {
      return activityInfo.userID === User.id;
    })
    const dailyMilesWalked = userActivityInfo.find(day => {
      day.date === selectedDate;
      
      let milesWalked = userActivityInfo.numSteps / (5280 / user.strideLength)
      console.log(milesWalked)
      return milesWalked
    })
    return dailyMilesWalked;
  }
}

module.exports = Activity;