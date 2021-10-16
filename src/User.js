class User {
  constructor(userData){
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.address = userData.address;
    this.h20Data = userData.h20Data;
    this.sleepData = userData.sleepData;
  }
}



module.exports = User;