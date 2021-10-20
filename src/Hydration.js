class Hydration{
  constructor(h20Data){
    this.h20Data = h20Data;

    this.numOunces = numOunces;
  }

  getAvgOuncesPerDay(id) {
    //1) iteratre throught this.h20 data
    //2) filter through data to get all of it for the given user
    //2) calculate avg
    //4 return result
    let totalOunces = 0;
    let userAvgWater = this.h20Data.filter((element) => {
    element.userID === id
    totalOunces += element.numOunces
    })
    return Math.floor(totalOunces/ this.h20Data.length);
  }
}


module.exports = Hydration;
