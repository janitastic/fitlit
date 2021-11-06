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
    //what happens if you pass in a date that there's no data for? Create a test that says you return 'undefined'
    this.getUserFilteredData(user);
    this.getSingleDayData(selectedDate);

    return this.singleDayData.numOunces;
  }

  calculateWeeklyWater(user, startDate) {
    this.getUserFilteredData(user);

    const userWaterConsumptionReverse = this.userFilteredData.reverse()

    let targetStartDate = userWaterConsumptionReverse.findIndex(waterInfo => {
      return waterInfo.date === startDate;
    });

    const targetEndDate = targetStartDate + 7;

    const weeklyWaterIntake = userWaterConsumptionReverse.slice(targetStartDate, targetEndDate);

    const dailyWaterIntake = weeklyWaterIntake.map((day) => {
      return day.numOunces;
    });
    return dailyWaterIntake;
  }
}

module.exports = Hydration;
