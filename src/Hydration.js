class Hydration {
  constructor(hydrationData) {
    this.h20Data = hydrationData;
  }

  getAvgOuncesPerDay(id) {
    const userWaterConsumption = this.h20Data.filter(waterInfo => {
      return waterInfo.userID === id;
    });

    const totalOuncesConsumed = userWaterConsumption.reduce((totalOunces, waterInfo) => {

      return totalOunces += waterInfo.numOunces;
    }, 0);

    return Math.round(totalOuncesConsumed / userWaterConsumption.length);
  }

  calculateDailyOunces(id, selectedDate) {
    const userWaterConsumption = this.h20Data.filter(waterInfo => {
      return waterInfo.userID === id;
    });

    const dailyWaterConsumed = userWaterConsumption.find(day => {
      return day.date === selectedDate;
    });

    // console.log(`daily ounces >>>> ${dailyWaterConsumed.numOunces}`)
    return dailyWaterConsumed.numOunces;
  }

  calculateWeeklyWater(id, startDate) {
    const userWaterConsumption = this.h20Data.filter(waterInfo => {
      return waterInfo.userID === id;
    });
    // console.log("user water", userWaterConsumption)
    const userWaterConsumptionReverse = userWaterConsumption.reverse()
    // console.log("user water consumption reverse ", userWaterConsumptionReverse)

    let targetStartDate = userWaterConsumptionReverse.findIndex(waterInfo => {
      return waterInfo.date === startDate;
    });

    let targetEndDate = targetStartDate + 7;

    const weeklyWaterIntake = userWaterConsumptionReverse.slice(targetStartDate, targetEndDate);

    const dailyWaterIntake = weeklyWaterIntake.reduce((dailyWater, day) => {
      dailyWater.push(day.numOunces)
      return dailyWater;
    }, []);
      return dailyWaterIntake;
  }
}

module.exports = Hydration;
