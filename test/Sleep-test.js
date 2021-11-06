import {
  expect
} from 'chai';
import Sleep from '../src/Sleep';
import User from '../src/User';

describe('Sleep', () => {

  let sleepInfo;
  let sleepData;
  let user1;

  beforeEach(() => {
    user1 = new User({
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    });

    sleepData = [
      {userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2},
      {userID: 1, date: '2019/06/16', hoursSlept: 7, sleepQuality: 4.7},
      {userID: 1, date: '2019/06/17', hoursSlept: 10.8, sleepQuality: 4.7},
      {userID: 1, date: '2019/06/18', hoursSlept: 5.4, sleepQuality: 3},
      {userID: 1, date: '2019/06/19', hoursSlept: 4.1, sleepQuality: 3.6},
      {userID: 1, date: '2019/06/20', hoursSlept: 9.6, sleepQuality: 2.9},
      {userID: 1, date: '2019/06/21', hoursSlept: 5.1, sleepQuality: 2.6},
      {userID: 2, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2},
      {userID: 2, date: '2019/06/16', hoursSlept: 7, sleepQuality: 4.7}
    ];

    sleepInfo = new Sleep(sleepData);
  })

  it('should be able to hold a set of sleep data', () => {
    expect(sleepInfo.dataset).to.deep.equal(sleepData);
  })

  it('should be able calculate a user\'s daily average hours sleep', () => {
    expect(sleepInfo.getAvgSleepPerDay(user1)).to.equal(7);
  })

  it('should be able to calculate a user\'s daily average sleep quality', () => {
    expect(sleepInfo.getAvgDailySleepQual(user1)).to.equal(3)
  })

  it('should be able to return a user\'s hours slept specified by a certain date', () => {
    const dailyHoursSlept = sleepInfo.getDailyHrsSlept(user1, '2019/06/15');
    expect(dailyHoursSlept).to.equal(6.1);
  })

  it('should be able to return a user\'s sleep quality specified by a certain date', () => {
    const dailySleepQual = sleepInfo.getDailySleepQual(user1, '2019/06/15');
    expect(dailySleepQual).to.equal(2.2)
  })

  it('should be able to return the daily hours slept each day for a week', () => {
    const totalHoursSlept = sleepInfo.getWeeklyHrsSlept(user1, '2019/06/21');
    expect(totalHoursSlept).to.deep.equal([5.1, 9.6, 4.1, 5.4, 10.8, 7, 6.1])
  })

  it('should be able to return the daily sleep quality each day for a week', () => {
    const totalSleepQual = sleepInfo.getWeeklySleepQual(user1, '2019/06/21');
    expect(totalSleepQual).to.deep.equal([2.6, 2.9, 3.6, 3, 4.7, 4.7, 2.2])
  })

  it('should be able to return the sleep average for all users', () => {
    const totalAvgSleepQual = sleepInfo.getAvgAllSleepQual();
    expect(totalAvgSleepQual).to.equal(3.4)
  })

})
