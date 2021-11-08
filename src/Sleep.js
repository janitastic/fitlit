let DataHandler = require('./DataHandler');
let User = require('./User');

class Sleep extends DataHandler {
  constructor(dataset) {
    super(dataset);
  }

  getAvgSleepPerDay(user) {
    this.getUserFilteredData(user);
    const totalHoursSlept = this.userFilteredData.reduce((totalHours, sleepInfo) => {
      return totalHours += sleepInfo.hoursSlept
    }, 0);
    return Math.round(totalHoursSlept / this.userFilteredData.length)
  }

  getAvgCommHrsSlept(selectedDate) {
    this.getAllUserDataSingleDate(selectedDate);
    const totalHoursSlept = this.allUserSingleDayData.reduce((totalHours, sleepInfo) => {
      return totalHours += sleepInfo.hoursSlept
    }, 0);
    return Math.round(totalHoursSlept / this.allUserSingleDayData.length)
  }

  getAvgDailySleepQual(user) {
    this.getUserFilteredData(user);
    const dailySleepQual = this.userFilteredData.reduce((totalQual, sleepInfo) => {
      return totalQual += sleepInfo.sleepQuality
    }, 0);
    return Math.round(dailySleepQual / this.userFilteredData.length)
  }

  getDailyHrsSlept(user, selectedDate) {
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
    return this.singleDayData.hoursSlept;
  }

  getDailySleepQual(user, selectedDate) {
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
    return this.singleDayData.sleepQuality;
  }

  getWeeklyHrsSlept(user, startDate) {
    this.getUserFilteredData(user);
    this.getWeeklyData(startDate);
    const dailySleep = this.weeklyData.map((day) => {
      return day.hoursSlept;
    });
    return dailySleep;
  }

  getWeeklySleepQual(user, startDate) {
    this.getUserFilteredData(user);
    this.getWeeklyData(startDate);
    const dailySleepQuality = this.weeklyData.map((day) => {
      return day.sleepQuality;
    });
    return dailySleepQuality;
  }

  getAvgAllSleepQual() {
    const sumOfSleepQual = this.dataset.reduce((acc, sleepInfo) => {
      acc += sleepInfo.sleepQuality
      return acc
    }, 0);
    const allUserAvgQual = Math.round(sumOfSleepQual / this.dataset.length * 10) / 10;
    return allUserAvgQual;
  }
}



module.exports = Sleep;
