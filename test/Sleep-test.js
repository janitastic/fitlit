import {
  expect
} from 'chai';
import Sleep from '../src/Sleep';

describe('User', () => {

  let sleepInfo;

  beforeEach(() => {
    let sleepData = [
      {userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2},
      {userID: 1, date: '2019/06/16', hoursSlept: 7, sleepQuality: 4.7},
      {userID: 1, date: '2019/06/17', hoursSlept: 10.8, sleepQuality: 4.7},
      {userID: 1, date: '2019/06/18', hoursSlept: 5.4, sleepQuality: 3},
      {userID: 1, date: '2019/06/19', hoursSlept: 4.1, sleepQuality: 3.6},
      {userID: 1, date: '2019/06/20', hoursSlept: 9.6, sleepQuality: 2.9},
      {userID: 1, date: '2019/06/21', hoursSlept: 5.1, sleepQuality: 2.6}
    ];
// //date: "2019/06/15"
// hoursSlept: 6.1
// sleepQuality: 2.2
// userID: 1
sleepInfo = new Sleep(sleepData);

})
  it('should be able calculate a user/s daily average hours sleep', () => {
    expect(sleepInfo.getAvgSleepPerDay(1)).to.equal(7);
  })

  it('should be able to calculate a user/s daily average sleep quality', () =>{
    expect(sleepInfo.getAvgDailySleepQual(1)).to.equal(3)
  })

  it('should be able to return a user/s hours slept specified by a certain date', () => {
    const dailyHoursSlept = sleepInfo.getDailyHrsSlept(1,'2019/06/15');
    expect(dailyHoursSlept).to.equal(6.1);
  })

  it('should be able to return a user/s sleep quality specified by a certain date', () => {
    const dailySleepQual = sleepInfo.getDailySleepQual(1,'2019/06/15');
    expect(dailySleepQual).to.equal(2.2)
  })
  
  it('should be able to return the daily hours slept each day for a week', () => {
    const totalHoursSlept = sleepInfo.getWeeklyHrsSlept(1, '2019/06/15');
    expect(totalHoursSlept).to.deep.equal([6.1, 7, 10.8, 5.4, 4.1, 9.6, 5.1])
  })

})
