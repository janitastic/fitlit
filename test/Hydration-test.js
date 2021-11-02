import {
  expect
} from 'chai';
import Hydration from '../src/Hydration';

describe('Hydration', () => {

  let hydrationInfo;

  beforeEach(() => {
    let hydrationData = [
      {userID: 1, date: '2019/06/15', numOunces: 37},
      {userID: 1, date: '2019/06/16', numOunces: 42},
      {userID: 1, date: '2019/06/17', numOunces: 54},
      {userID: 1, date: '2019/06/18', numOunces: 65},
      {userID: 1, date: '2019/06/19', numOunces: 87},
      {userID: 1, date: '2019/06/20', numOunces: 22},
      {userID: 1, date: '2019/06/21', numOunces: 16}
    ];

    hydrationInfo = new Hydration(hydrationData);
  })

  it('should return how much water the user consumed on average', () => {
    expect(hydrationInfo.getAvgOuncesPerDay(1)).to.equal(46);
  })

  it('should be able to calculate total ounces consumed in a specific day', () => {
    const totalOunces = hydrationInfo.calculateDailyOunces(1, '2019/06/15');
    expect(totalOunces).to.equal(37);
  })

  it('should return the amount of water consumed each day for a week ', () => {
    const totalOunces = hydrationInfo.calculateWeeklyWater(1, '2019/06/21');
    expect(totalOunces).to.deep.equal([16, 22, 87, 65, 54, 42, 37]);
  })
})
