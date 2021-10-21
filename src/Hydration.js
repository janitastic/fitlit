class Hydration {
  constructor(hydrationData) {
    this.h20Data = hydrationData;
  }

  getAvgOuncesPerDay(id) {
    //1) iteratre throught this.h20 data
    //2) filter through data to get all of it for the given user
    //3) calculate avg
    //4 return result
    const userWaterConsumption = this.h20Data.filter(waterInfo => {
      // console.log('this is user object', waterInfo)
      return waterInfo.userID === id;
    });

    const totalOuncesConsumed = userWaterConsumption.reduce((totalOunces, waterInfo) => {
      // console.log('this is totalOunces', totalOunces);
      // console.log('userWaterConsumption', userWaterConsumption)
      return totalOunces += waterInfo.numOunces;
    }, 0);

    // let avgWaterConsumed = Math.round(totalOuncesConsumed / userWaterConsumption.length);
    return Math.round(totalOuncesConsumed / userWaterConsumption.length);

    // console.log(`avg ounces consumed by user >>>> ${avgWaterConsumed}`);
    // return avgWaterConsumed;
  }

  // calculateDailyOunces(id) {
  //   let userWaterConsumption = this.h20Data.filter(waterInfo => {
  //     return waterInfo.userID === id;
  //   });
  //
  //   let totalOuncesConsumed = userWaterConsumption.reduce((totalOunces, waterInfo) => {
  //     return totalOunces += waterInfo.numOunces;
  //   }, 0);
  //
  //   console.log(`daily ounces >>>> ${totalOuncesConsumed}`)
  //   return totalOuncesConsumed;
  // }
}

module.exports = Hydration;
