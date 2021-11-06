import {
  expect
} from 'chai';
import Hydration from '../src/Hydration';
import User from '../src/User';

describe('Hydration', () => {

  let hydrationInfo;
  let hydrationInfo2;
  let hydrationData;
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

    hydrationData = [
      {userID: 1, date: '2019/06/15', numOunces: 37},
      {userID: 1, date: '2019/06/16', numOunces: 42},
      {userID: 1, date: '2019/06/17', numOunces: 54},
      {userID: 1, date: '2019/06/18', numOunces: 65},
      {userID: 1, date: '2019/06/19', numOunces: 87},
      {userID: 1, date: '2019/06/20', numOunces: 22},
      {userID: 1, date: '2019/06/21', numOunces: 16}
    ];

    hydrationInfo = new Hydration(hydrationData);
    hydrationInfo2 = new Hydration([]);
  })


  it('should be a function', () => {
    expect(Hydration).to.be.a('function');
  });

  it('should be able to hold a set of hydration data', () => {
    expect(hydrationInfo.dataset).to.deep.equal(hydrationData);
    expect(hydrationInfo2.dataset).to.deep.equal([]);
  })

  it('should return how much water the user consumed on average', () => {
    expect(hydrationInfo.getAvgOuncesPerDay(user1)).to.equal(46);
  })

  it('should be able to calculate total ounces consumed in a specific day', () => {
    const totalOunces = hydrationInfo.calculateDailyOunces(user1, '2019/06/15');
    expect(totalOunces).to.equal(37);
  })

  it('should return the amount of water consumed each day for a week ', () => {
    const totalOunces = hydrationInfo.calculateWeeklyWater(user1, '2019/06/21');
    expect(totalOunces).to.deep.equal([16, 22, 87, 65, 54, 42, 37]);
  })
})
