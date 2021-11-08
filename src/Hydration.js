let DataHandler = require('./DataHandler');
let User = require('./User');

class Hydration extends DataHandler {
  constructor(dataset) {
    super(dataset)
  }

  getAvgOuncesPerDay(user) {
    this.getUserFilteredData(user);
    const totalOuncesConsumed = this.userFilteredData.reduce((totalOunces, waterInfo) => {
      return totalOunces += waterInfo.numOunces;
    }, 0);
    return Math.round(totalOuncesConsumed / this.userFilteredData.length);
  }

  calculateDailyOunces(user, selectedDate) {
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);
    return this.singleDayData.numOunces;
  }

  calculateAvgCommDailyOunces(selectedDate) {
    this.getAllUserDataSingleDate(selectedDate);
    const totalOuncesConsumed = this.allUserSingleDayData.reduce((totalOunces, waterInfo) => {
      return totalOunces += waterInfo.numOunces;
    }, 0);
    return Math.round(totalOuncesConsumed / this.allUserSingleDayData.length);
  }

  calculateWeeklyWater(user, startDate) {
    this.getUserFilteredData(user);
    this.getWeeklyData(startDate);
    const dailyWaterIntake = this.weeklyData.map((day) => {
      return day.numOunces;
    });
    return dailyWaterIntake;
  }
}

module.exports = Hydration;
