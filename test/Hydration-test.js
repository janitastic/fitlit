import {
  expect
} from 'chai';
// import User from '../src/User';
import Hydration from '../src/Hydration';

describe('User', () => {
  // let user1;
  // let user2;
  // let user3;
  let hydrationInfo;

  beforeEach(() => {
    // user1 = new User({
    //   "id": 1,
    //   "name": "Luisa Hane",
    //   "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    //   "email": "Diana.Hayes1@hotmail.com",
    //   "strideLength": 4.3,
    //   "dailyStepGoal": 10000,
    //   "friends": [16, 4, 8]
    // })
    //
    // user2 = new User({
    //   "id": 2,
    //   "name": "Jarvis Considine",
    //   "address": "30086 Kathryn Port, Ciceroland NE 07273",
    //   "email": "Dimitri.Bechtelar11@gmail.com",
    //   "strideLength": 4.5,
    //   "dailyStepGoal": 5000,
    //   "friends": [9, 18, 24, 19]
    // })

    let hydrationData = [
      {userID: 1, date: '2019/06/15', numOunces: 37},
      {userID: 1, date: '2019/06/16', numOunces: 42},
      {userID: 1, date: '2019/06/17', numOunces: 54}
    ];

    hydrationInfo = new Hydration(hydrationData);
  })

  // it('should be able to return a users first name', () => {
  //   expect(user2.getFirstName()).to.equal('Jarvis')
  // })

  it('should return how much water the user consumed on average', () => {
    expect(hydrationInfo.getAvgOuncesPerDay(1)).to.equal(44);
  })

  it('should be able to calculate total ounces consumed in a specific day', () => {
    const totalOunces = hydrationInfo.calculateDailyOunces();
    expect(totalOunces).to.equal(133);
  })
})
