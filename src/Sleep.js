class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getAvgSleepPerDay(id) {
    const userSleepHours = this.sleepData.filter(sleepInfo => {
      return sleepInfo.userID === id
    });

    const totalHoursSlept = userSleepHours.reduce((totalHours, sleepInfo) => {
      return totalHours += sleepInfo.hoursSlept
    }, 0);

    return Math.round(totalHoursSlept / userSleepHours.length)
  }

  getAvgDailySleepQual(id) {
    const userSleepHours = this.sleepData.filter((sleepInfo) => {
      return sleepInfo.userID === id;
    })

    const dailySleepQual = userSleepHours.reduce((totalQual, sleepInfo) => {
      // console.log('sleepInfo>>>', sleepInfo.sleepQuality);
      return totalQual += sleepInfo.sleepQuality
    }, 0);

    return Math.round(dailySleepQual / userSleepHours.length)
  }

  getDailyHrsSlept(id, selectedDate) {
    const userSleepHours = this.sleepData.filter((sleepInfo) => {
      return sleepInfo.userID === id;
    })
    const dailyHoursSlept = userSleepHours.find(day => {
      return day.date === selectedDate;
    })
    return dailyHoursSlept.hoursSlept;
  }

  getDailySleepQual(id, selectedDate) {
    const userSleepHours = this.sleepData.filter((sleepInfo) => {
      return sleepInfo.userID === id;
    })
    const dailySleepQual = userSleepHours.find(day => {
      return day.date === selectedDate;
    })
    return dailySleepQual.sleepQuality
  }
  getWeeklyHrsSlept(id, startDate) {
    const userSleepHours = this.sleepData.filter((sleepInfo) => {
      return sleepInfo.userID === id;
    });

    let targetStartDate = userSleepHours.findIndex(sleepInfo => {
      
      return sleepInfo.date === startDate;
    });

    let targetEndDate = targetStartDate + 7;
    
    const weeklyHoursSlept = userSleepHours.slice(targetStartDate, targetEndDate);
    const dailySleep = weeklyHoursSlept.reduce((dailyHours, day) => {
      dailyHours.push(day.hoursSlept)
      return dailyHours;
    }, []);
      return dailySleep;
  }
}



module.exports = Sleep;