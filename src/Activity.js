let DataHandler = require('./DataHandler');
let User = require('./User');

class Activity extends DataHandler {
  constructor(dataset) {
    super(dataset)
  }

  getDailySteps(user, selectedDate){
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);

    return this.singleDayData.numSteps;
  }

  getDailyMiles(user, selectedDate) {
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
      let milesWalked = this.singleDayData.numSteps / (5280 / user.strideLength)

      return Math.round(milesWalked * 10)/ 10
  }

  getDailyMinsActive(user, selectedDate) {
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
      let minsActive = this.singleDayData.minutesActive;
      return minsActive;
  }

  getAvgDailyMinsActive(user, startDate){
    this.getUserFilteredData(user);
    const targetStartDate = this.userFilteredData.findIndex(day => {
      return day.date === startDate;
    })
    const targetEndDate = targetStartDate + 7;
    let weeklyMinsActive = this.userFilteredData.slice(targetStartDate, targetEndDate);
    const totalMinsActive = weeklyMinsActive.reduce((totalMinsActive, day) => {
      totalMinsActive += day.minutesActive;
      return totalMinsActive
    }, 0)
    return Math.floor(totalMinsActive / 7);
  }

  checkStepGoalStatus(user, selectedDate){
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
    if(this.singleDayData.numSteps >= user.dailyStepGoal){
      return true
    } else {
      return false
    }
  }

  findDaysOverStepGoal(user){
    this.getUserFilteredData(user);
    const stepGoalClears = this.userFilteredData.reduce((passedDays, day) => {
      if(day.numSteps >= user.dailyStepGoal){
        passedDays.push(day.date)
      }
      return passedDays
    }, [])
    return stepGoalClears;
  }

  findMostClimbedFlights(user){
    this.getUserFilteredData(user);
    const mostStairsClimbed = this.userFilteredData.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs
    })
    return mostStairsClimbed[0].flightsOfStairs;
  }

  findCommunityAvgFlights(selectedDate){
    this.getAllUserDataSingleDate(selectedDate);
    const avgFlightsClimbed = this.allUserSingleDayData.reduce((allFlights, userData) => {
      allFlights += userData.flightsOfStairs;
      return allFlights
    }, 0)
    return Math.floor(avgFlightsClimbed / this.allUserSingleDayData.length * 10) / 10;
  }

  findCommunityAvgSteps(selectedDate){
    this.getAllUserDataSingleDate(selectedDate);
    const avgStepsTaken = this.allUserSingleDayData.reduce((allSteps, userData) => {
      allSteps += userData.numSteps;
      return allSteps
    }, 0)
    return Math.floor(avgStepsTaken / this.allUserSingleDayData.length);
  }

  findCommunityAvgMinutes(selectedDate){
    this.getAllUserDataSingleDate(selectedDate);
    const avgMinutesActive = this.allUserSingleDayData.reduce((allActivity, userData) => {
      allActivity += userData.minutesActive;
      return allActivity;
    }, 0)
    return Math.floor(avgMinutesActive / this.allUserSingleDayData.length);
  }
}

module.exports = Activity;
