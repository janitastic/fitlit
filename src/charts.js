import Chart from 'chart.js/auto';

const displayCharts = (userh20, userSleep, userActivity, currentUser, todaysDate) => {
  //WEEKLY WATER
  let weeklyWaterChartData = userh20.calculateWeeklyWater(currentUser, todaysDate);
  var weeklyWaterChart = document.getElementById('weeklyWaterChart').getContext('2d');
  const weeklyWaterLabels = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
  const weeklyWaterData = {
    labels: weeklyWaterLabels,
    datasets: [{
      label: 'Total Ounces',
      data: weeklyWaterChartData,
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1,
    }, {
      label: 'Recommended Daily',
      data: [64, 64, 64, 64, 64, 64, 64],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1,
    }]
  };

  var weeklyWaterChartBuilder = new Chart(weeklyWaterChart, {
    type: 'bar',
    data: weeklyWaterData,
    options: {
      plugins: {
        legend: {
          labels: {
            color: ['#FFF']
          }
        }
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});

  // DAILY WATER CHART
  var dailyWaterChart = document.getElementById('dailyWaterChart').getContext('2d');
  let dailyWaterChartData = userh20.calculateDailyOunces(currentUser, todaysDate);
  const dailyWaterData = {
    labels: [''],
    datasets: [{
      label: 'Ounces',
      data: [dailyWaterChartData],
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1,
    }, {
      label: 'Recommended Daily',
      data: [64],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1
    }]
  };

  var dailyWaterChartBuilder = new Chart(dailyWaterChart, {
    type: 'bar',
    data: dailyWaterData,
    options: {
      plugins: {
        legend: false,
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
  }});

  // DAILY STEPS CHART

  var dailyStepsChart = document.getElementById('dailyStepsChart').getContext('2d');
  let dailyStepsChartData = userActivity.getDailySteps(currentUser, todaysDate)
  const dailyStepsData = {
    labels: [''],
    datasets: [{
      label: 'Steps',
      data: [dailyStepsChartData],
      backgroundColor: ['rgba(235, 179, 35, 0.4)'],
      borderColor: ['rgb(235, 179, 35)'],
      borderWidth: 1,
      order: 1,
    }, {
      label: 'Goal',
      data: [currentUser.dailyStepGoal],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1,
    }]
  };

  var dailyStepsChartBuilder = new Chart(dailyStepsChart, {
    type: 'bar',
    data: dailyStepsData,
    options: {
      plugins: {
        legend: false,
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
  }});

  // DAILY SLEEP CHART
  var dailySleepChart = document.getElementById('dailySleepChart').getContext('2d');
  let dailySleepChartData = userSleep.getDailyHrsSlept(currentUser, todaysDate);
  const dailySleepData = {
    labels: [""],
    datasets: [{
      label: 'Time Slept',
      data: [dailySleepChartData],
      backgroundColor: ['rgba(96, 23, 116, 0.4)'],
      borderColor: ['rgb(96, 23, 116)'],
      borderWidth: 1,
      order: 1,
    }, {
      label: 'Recommended Nightly',
      data: [7],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1,
    }]
  };

  var dailySleepChartBuilder = new Chart(dailySleepChart, {
    type: 'bar',
    data: dailySleepData,
    options: {
      plugins: {
        legend: false,
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});


// WEEKLY STEPS

  let weeklyStepChartData = userActivity.getWeeklySteps(currentUser, todaysDate);
  var weeklyStepChart = document.getElementById('weeklyStepChart').getContext('2d');
  const weeklyStepLabels = ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'];
  const weeklyStepGoals = new Array(7).fill(currentUser.dailyStepGoal);
  const weeklyStepData = {
    labels: weeklyStepLabels,
    datasets: [{
      label: 'Total Steps',
      data: weeklyStepChartData,
      backgroundColor: ['rgba(235, 180, 35, 0.4)'],
      borderColor: ['rgb(235, 180, 35)'],
      borderWidth: 1,
      order: 1,
    }, {
      label: 'Goal',
      data: weeklyStepGoals,
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1,
    }]
  };

  var weeklyStepChartBuilder = new Chart(weeklyStepChart, {
    type: 'bar',
    data: weeklyStepData,
    options: {
      plugins: {
        legend: {
          labels: {
            color: ['#FFF'],
          }
        }
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false,
          },
          display: false,
        },
        y: {
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});

    //WEEKLY SLEEP
    let weeklySleepChartData = userSleep.getWeeklyHrsSlept(currentUser, todaysDate);
    let weeklySleepQualData = userSleep.getWeeklySleepQual(currentUser, todaysDate);
    var weeklySleepChart = document.getElementById('weeklySleepChart').getContext('2d');

    const weeklySleepQuality = weeklySleepQualData;
    const weeklySleepData = {
      labels: ['SUN', 'MON', 'TUES', 'WED', 'THUR', 'FRI', 'SAT'],
      datasets: [{
        type: 'bar',
        label: 'Time Slept',
        data: weeklySleepChartData,
        backgroundColor: ['rgba(96, 23, 116, 0.4)'],
        borderColor: ['rgb(96, 23, 116)'],
        borderWidth: 1,
        order: 2,
      }, {
        type: 'bar',
        label: 'Recommended Nightly',
        data: [7, 7, 7, 7, 7, 7, 7],
        backgroundColor: ['rgba(255, 255, 255, 0.8)'],
        order: 3,
      }, {
        type: 'line',
        label: 'Sleep Quality',
        data: weeklySleepQuality,
        pointRadius: 7,
        pointHoverRadius: 12,
        borderWidth: 8,
        tension: 0.3,
        backgroundColor: ['rgb(96, 23, 116)'],
        order: 1,
      }]
    };

    var weeklySleepChartBuilder = new Chart(weeklySleepChart, {
      type: 'bar',
      data: weeklySleepData,
      options: {
        plugins: {
          legend: {
            labels: {
              color: ['#FFF'],
            }
          }
        },
        tooltip: {
          mode: 'dataset'
        },
        indexAxis: 'y',
        scales: {
          x: {
            grid: {
              display: false,
            } ,
            display: false,
            },
          y: {
            beginAtZero: true,
            stacked: true,
            grid: {
              display: false,
            },
            ticks: {
              color: ['#FFF'],
            },
          }
        },
    }});
}

export default displayCharts;
