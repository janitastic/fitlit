let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }


  getDailyMiles(user, selectedDate) {
    const userActivityInfo = this.activityData.filter(activityInfo => {
      return activityInfo.userID === user.id;
    })
    console.log('actInfo>>>', userActivityInfo)
    console.log('actInfo>>>', userActivityInfo.numSteps)
    const dailyMilesWalked = userActivityInfo.find(day => {
      return day.date === selectedDate;
    })
    console.log('dailyMilesWalked>>>',dailyMilesWalked)
      let milesWalked = dailyMilesWalked.numSteps / (5280 / user.strideLength) 
      console.log('milesWalked>>>',milesWalked)
      return Math.round(milesWalked * 10)/ 10
    
    console.log('milesWalked>>>',dailyMilesWalked)
    return dailyMilesWalked;
  }

  // getDailyMinsActive(id, selectedDate) {
  //   const userActivityInfo = this.activityData.filter(activityInfo => {
  //     return activityInfo.userID === id
  //   })
  //   const dailyMinsActive = userActivityInfo.find(day => {
  //     day.date === selectedDate
  //     let minsActive = userActivityInfo.minutesActive
  //     console.log('minsActive>>', minsActive)
  //     return minsActive;
  //   })
  //   console.log('dailyMinsActive>>', dailyMinsActive)
  //  return dailyMinsActive;
  // }
}
//For a user, (identified by their userID) how many minutes were they active for a given day (specified by a date)?

module.exports = Activity;