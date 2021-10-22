class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getAvgSleepPerDay(id) {
    const userSleepHours = this.sleepData.filter(sleepInfo => {
      return sleepInfo.userID === id
    });

    const totalHoursSlept = userSleepHours.reduce((totalHours, sleepInfo) => {
      return totalHours +=  sleepInfo.hoursSlept
    }, 0);

    return Math.round(totalHoursSlept/ userSleepHours.length)
  }
}



module.exports = Sleep;