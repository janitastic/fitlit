let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.singleDayData;
  }

  getSingleDayData(user, selectedDate){
    const userActivityInfo = this.activityData.filter(activityInfo => {
      return activityInfo.userID === user.id;
    })
    const singleDayData = userActivityInfo.find(day => {
      return day.date === selectedDate;
    })
    this.singleDayData = singleDayData;
  }

  getDailyMiles(user, selectedDate) {
    this.getSingleDayData(user, selectedDate);
      let milesWalked = this.singleDayData.numSteps / (5280 / user.strideLength)

      return Math.round(milesWalked * 10)/ 10
  }

  getDailyMinsActive(user, selectedDate) {
    this.getSingleDayData(user, selectedDate);
      let minsActive = this.singleDayData.minutesActive;
      return minsActive;
  }
}

module.exports = Activity;
