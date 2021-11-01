class Hydration {
  constructor(hydrationData) {
    this.h20Data = hydrationData;
  }

  getUserWaterIntake(id) {
    const userWaterConsumption = this.h20Data.filter(waterInfo => {
      return waterInfo.userID === id;
    });
    return userWaterConsumption;
  }

  getAvgOuncesPerDay(id) {
    const userWaterConsumption = this.getUserWaterIntake(id);

    const totalOuncesConsumed = userWaterConsumption.reduce((totalOunces, waterInfo) => {

      return totalOunces += waterInfo.numOunces;
    }, 0);

    return Math.round(totalOuncesConsumed / userWaterConsumption.length);
  }

  calculateDailyOunces(id, selectedDate) {
    const userWaterConsumption = this.getUserWaterIntake(id);

    const dailyWaterConsumed = userWaterConsumption.find(day => {
      return day.date === selectedDate;
    });

    return dailyWaterConsumed.numOunces;
  }

  calculateWeeklyWater(id, startDate) {
    const userWaterConsumption = this.getUserWaterIntake(id);

    const userWaterConsumptionReverse = userWaterConsumption.reverse()

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
