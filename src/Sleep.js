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

    const userSleepHoursReverse = userSleepHours.reverse();

    let targetStartDate = userSleepHoursReverse.findIndex(sleepInfo => {

      return sleepInfo.date === startDate;
    });

    let targetEndDate = targetStartDate + 7;

    const weeklyHoursSlept = userSleepHoursReverse.slice(targetStartDate, targetEndDate);
    const dailySleep = weeklyHoursSlept.reduce((dailyHours, day) => {
      dailyHours.push(day.hoursSlept)
      return dailyHours;
    }, []);
    return dailySleep;
  }
  getWeeklySleepQual(id, startDate) {
    const userSleepQual = this.sleepData.filter((sleepInfo) => {
      return sleepInfo.userID === id;
    });

    const userSleepQualReverse = userSleepQual.reverse();

    let targetStartDate = userSleepQualReverse.findIndex(sleepInfo => {

      return sleepInfo.date === startDate;
    });

    let targetEndDate = targetStartDate + 7;

    const weeklySleepQual = userSleepQualReverse.slice(targetStartDate, targetEndDate);

    const dailySleepQuality = weeklySleepQual.reduce((daySleepQual, day) => {
      daySleepQual.push(day.sleepQuality)
      return daySleepQual;
    }, []);
    return dailySleepQuality;
  }

  getAvgAllSleepQual() {
    const sumOfSleepQual = this.sleepData.reduce((acc, sleepInfo) => {
      acc += sleepInfo.sleepQuality
      return acc
    }, 0);
    const allUserAvgQual = Math.round(sumOfSleepQual / this.sleepData.length * 10) / 10;
    return allUserAvgQual;
  }
}



module.exports = Sleep;
