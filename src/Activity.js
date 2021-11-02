let User = require('../src/User')

class Activity {
  constructor(activityData) {
    this.activityData = activityData;
  }


  getDailyMiles(user, selectedDate) {
    const userActivityInfo = this.activityData.filter(activityInfo => {
      return activityInfo.userID === user.id;
    })

    const dailyMilesWalked = userActivityInfo.find(day => {
      return day.date === selectedDate;
    })
      let milesWalked = dailyMilesWalked.numSteps / (5280 / user.strideLength) 
  
      return Math.round(milesWalked * 10)/ 10
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