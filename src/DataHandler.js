let User = require('../src/User')

class DataHandler {
  constructor(dataset) {
    this.dataset = dataset;
    this.userFilteredData;
    this.singleDayData;
    this.allUserSingleDayData;
    this.weeklyData;
  }

  getUserFilteredData(user) {
    const userFilteredInfo = this.dataset.filter(dataObject => {
      return dataObject.userID === user.id;
    });
    this.userFilteredData = userFilteredInfo;
  }

  getSingleDayData(selectedDate) {
    const singleDayData = this.userFilteredData.find(day => {
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

  getWeeklyData(selectedDate){
    this.userFilteredData.reverse();
    const targetStartDate = this.userFilteredData.findIndex(day => {
      return day.date === selectedDate;
    })
    const targetEndDate = targetStartDate + 7;
    this.weeklyData = this.userFilteredData.slice(targetStartDate, targetEndDate);
  }
}

module.exports = DataHandler;
