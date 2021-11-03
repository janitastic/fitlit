import Chart from 'chart.js/auto';

const displayCharts = (userh20, allUsersSleep, currentUser, todaysDate) => {
  //WEEKLY WATER
  let weeklyWaterChartData = userh20.calculateWeeklyWater(currentUser.id, todaysDate);
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
      order: 1
    }, {
      label: 'Goal',
      data: [64, 64, 64, 64, 64, 64, 64],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1
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
            display: false
          },
          display: false
        },
        y: {
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});

  // DAILY WATER CHART
  var dailyWaterChart = document.getElementById('dailyWaterChart').getContext('2d');
  let dailyWaterChartData = userh20.calculateDailyOunces(currentUser.id, todaysDate)
  const dailyWaterData = {
    labels: [''],
    datasets: [{
      label: 'Ounces',
      data: [dailyWaterChartData],
      backgroundColor: ['rgba(54, 162, 235, 0.4)'],
      borderColor: ['rgb(54, 162, 235)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
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
        legend: false
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false
          },
          display: false
        },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
  }});

  //AVERAGE WATER - can we remove this one now?
  // var totalAvgWaterChart = document.getElementById('avgUserWaterChart').getContext('2d');
  // let avgWaterChartData = userh20.getAvgOuncesPerDay(currentUser.id);
  // const avgWaterData = {
  //   labels: [''],
  //   datasets: [{
  //     label: 'Average Ounces',
  //     data: [avgWaterChartData],
  //     backgroundColor: ['rgba(54, 162, 235, 0.4)'],
  //     borderColor: ['rgb(54, 162, 235)'],
  //     borderWidth: 1,
  //     order: 1
  //   }, {
  //     label: 'Goal',
  //     data: [64],
  //     backgroundColor: ['rgba(255, 255, 255, 0.8)'],
  //     order: 1
  //   }]
  // };
  //
  // var avgWaterChartBuilder = new Chart(totalAvgWaterChart, {
  //   type: 'bar',
  //   data: avgWaterData,
  //   options: {
  //     plugins: {
  //       legend: false
  //     },
  //     indexAxis: 'y',
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false
  //         },
  //         display: false
  //       },
  //       y: {
  //         title: false,
  //         beginAtZero: true,
  //         stacked: true,
  //         grid: {
  //           display: false
  //         },
  //         ticks: {
  //           color: ['#FFF'],
  //         },
  //       }
  //     }
  //   }});

  // DAILY SLEEP CHART
  var dailySleepChart = document.getElementById('dailySleepChart').getContext('2d');
  let dailySleepChartData = allUsersSleep.getDailyHrsSlept(currentUser.id, todaysDate);
  const dailySleepData = {
    labels: [""],
    datasets: [{
      label: 'Time Slept',
      data: [dailySleepChartData],
      backgroundColor: ['rgba(96, 23, 116, 0.4)'],
      borderColor: ['rgb(96, 23, 116)'],
      borderWidth: 1,
      order: 1
    }, {
      label: 'Goal',
      data: [7],
      backgroundColor: ['rgba(255, 255, 255, 0.8)'],
      order: 1
    }]
  };

  var dailySleepChartBuilder = new Chart(dailySleepChart, {
    type: 'bar',
    data: dailySleepData,
    options: {
      plugins: {
        legend: false
      },
      indexAxis: 'y',
      scales: {
        x: {
          grid: {
            display: false
          },
          display: false
        },
        y: {
          title: false,
          beginAtZero: true,
          stacked: true,
          grid: {
            display: false
          },
          ticks: {
            color: ['#FFF'],
          },
        }
      }
    }});

  //AVERAGE SLEEP - we can also remove this chart
  // var totalAvgSleepChart = document.getElementById('avgUserSleepChart').getContext('2d');
  // let avgSleepChartData = allUsersSleep.getAvgSleepPerDay(currentUser.id);
  // const avgSleepData = {
  //   labels: [''],
  //   datasets: [{
  //     label: 'Time Slept Average',
  //     data: [avgSleepChartData],
  //     backgroundColor: ['rgba(96, 23, 116, 0.4)'],
  //     borderColor: ['rgb(96, 23, 116)'],
  //     borderWidth: 1,
  //     order: 1
  //   }, {
  //     label: 'Goal',
  //     data: [7],
  //     backgroundColor: ['rgba(255, 255, 255, 0.8)'],
  //     order: 1
  //   }]
  // };
  // var avgSleepChartBuilder = new Chart(totalAvgSleepChart, {
  //   type: 'bar',
  //   data: avgSleepData,
  //   options: {
  //     plugins: {
  //       legend: false
  //     },
  //     indexAxis: 'y',
  //     scales: {
  //       x: {
  //         grid: {
  //           display: false
  //         },
  //         display: false
  //       },
  //       y: {
  //         title: false,
  //         beginAtZero: true,
  //         stacked: true,
  //         grid: {
  //           display: false
  //         },
  //         ticks: {
  //           color: ['#FFF'],
  //         },
  //       }
  //     }
  //   }});

    //WEEKLY SLEEP

    let weeklySleepChartData = allUsersSleep.getWeeklyHrsSlept(currentUser.id, todaysDate);
    let weeklySleepQualData = allUsersSleep.getWeeklySleepQual(currentUser.id, todaysDate);

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
        order: 2
      }, {
        type: 'bar',
        label: 'Goal',
        data: [7, 7, 7, 7, 7, 7, 7],
        backgroundColor: ['rgba(255, 255, 255, 0.8)'],
        order: 3
      }, {
        type: 'line',
        label: 'Sleep Quality',
        data: weeklySleepQuality,
        pointRadius: 7,
        pointHoverRadius: 12,
        borderWidth: 8,
        tension: 0.3,
        backgroundColor: ['rgb(96, 23, 116)'],
        order: 1
      }]
    };

    var weeklySleepChartBuilder = new Chart(weeklySleepChart, {
      type: 'bar',
      data: weeklySleepData,
      options: {
        plugins: {
          legend: {
            labels: {
              color: ['#FFF']
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
              display: false
            } ,
            display: false
            },
          y: {
            beginAtZero: true,
            stacked: true,
            grid: {
              display: false
            },
            ticks: {
              color: ['#FFF'],
            },
          }
        },
    }});
}

export default displayCharts;
