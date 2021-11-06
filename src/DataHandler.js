let User = require('../src/User')

class DataHandler {
  constructor(dataset) {
    this.dataset = dataset;
    this.userFilteredData;
    this.singleDayData;
    this.allUserSingleDayData;
  }

  getUserFilteredData(user) {
    const userFilteredInfo = this.dataset.filter(dataObject => {
      return dataObject.userID === user.id;
    });
    this.userFilteredData = userFilteredInfo;
  }

  getSingleDayData(selectedDate) {
    const singleDayData = this.dataset.find(day => {
      return day.date === selectedDate;
    })
    this.singleDayData = singleDayData;
  }

  getAllUserDataSingleDate(selectedDate){
    const allUserSingleDate = this.dataset.filter(day => {
      return day.date === selectedDate;
    })
    this.allUserSingleDayData = allUserSingleDate;
  }
}

module.exports = DataHandler;
