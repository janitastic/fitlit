import {
  expect
} from 'chai';
// import User from '../src/User';
import Hydration from '../src/Hydration';

describe('User', () => {

  let hydrationInfo;

  beforeEach(() => {
    let hydrationData = [
      {userID: 1, date: '2019/06/15', numOunces: 37},
      {userID: 1, date: '2019/06/16', numOunces: 42},
      {userID: 1, date: '2019/06/17', numOunces: 54}
    ];

    hydrationInfo = new Hydration(hydrationData);
  })

  it('should return how much water the user consumed on average', () => {
    expect(hydrationInfo.getAvgOuncesPerDay(1)).to.equal(44);
  })

  it('should be able to calculate total ounces consumed in a specific day', () => {
    const totalOunces = hydrationInfo.calculateDailyOunces(1, '2019/06/15');
    expect(totalOunces).to.equal(37);
  })
})
