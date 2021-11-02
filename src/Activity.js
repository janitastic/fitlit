let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.userActivityData;
    this.singleDayData;
  }

  getUserActivityData(user){
    const userActivityInfo = this.activityData.filter(activityInfo => {
      return activityInfo.userID === user.id;
    })
    this.userActivityData = userActivityInfo;
  }

  getSingleDayData(selectedDate){
    const singleDayData = this.userActivityData.find(day => {
      return day.date === selectedDate;
    })
    this.singleDayData = singleDayData;
  }

  getDailyMiles(user, selectedDate) {
    this.getUserActivityData(user);
    this.getSingleDayData(selectedDate);
      let milesWalked = this.singleDayData.numSteps / (5280 / user.strideLength)

      return Math.round(milesWalked * 10)/ 10
  }

  getDailyMinsActive(user, selectedDate) {
    this.getUserActivityData(user);
    this.getSingleDayData(selectedDate);
      let minsActive = this.singleDayData.minutesActive;
      return minsActive;
  }

  getAvgDailyMinsActive(user, startDate){
    this.getUserActivityData(user);
    const targetStartDate = this.userActivityData.findIndex(day => {
      return day.date === startDate;
    })
    const targetEndDate = targetStartDate + 7;
    let weeklyMinsActive = this.userActivityData.slice(targetStartDate, targetEndDate);
    const totalMinsActive = weeklyMinsActive.reduce((totalMinsActive, day) => {
      totalMinsActive += day.minutesActive;
      return totalMinsActive
    }, 0)
    return Math.floor(totalMinsActive / 7);
  }

  checkStepGoalStatus(user, selectedDate){
    this.getUserActivityData(user);
    this.getSingleDayData(selectedDate);
    if(this.singleDayData.numSteps >= user.dailyStepGoal){
      return true
    } else {
      return false
    }
  }
}

module.exports = Activity;
