let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
    this.userActivityData;
    this.singleDayData;
    this.allUserSingleDateData;
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

  getAllUserDataSingleDate(selectedDate){
    const allUserSingleDate = this.activityData.filter(day => {
      return day.date === selectedDate;
    })
    this.allUserSingleDateData = allUserSingleDate;
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

  findDaysOverStepGoal(user){
    this.getUserActivityData(user);
    const stepGoalClears = this.userActivityData.reduce((passedDays, day) => {
      if(day.numSteps >= user.dailyStepGoal){
        passedDays.push(day.date)
      }
      return passedDays
    }, [])
    return stepGoalClears;
  }

  findMostClimbedFlights(user){
    this.getUserActivityData(user);
    const mostStairsClimbed = this.userActivityData.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs
    })
    return mostStairsClimbed[0].flightsOfStairs;
  }

  findCommunityAvgFlights(selectedDate){
    this.getAllUserDataSingleDate(selectedDate);
    const avgFlightsClimbed = this.allUserSingleDateData.reduce((allFlights, userData) => {
      allFlights += userData.flightsOfStairs;
      return allFlights
    }, 0)
    return Math.floor(avgFlightsClimbed / this.allUserSingleDateData.length * 10) / 10;
  }

  findCommunityAvgSteps(selectedDate){
    this.getAllUserDataSingleDate(selectedDate);
    const avgStepsTaken = this.allUserSingleDateData.reduce((allSteps, userData) => {
      allSteps += userData.numSteps;
      return allSteps
    }, 0)
    return Math.floor(avgStepsTaken / this.allUserSingleDateData.length);
  }

}

module.exports = Activity;
