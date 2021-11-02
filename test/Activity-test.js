import {
  expect
} from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';


describe('Activity', () => {
   let activityInfo;
   let user1;

   beforeEach(() => {
    user1 = new User({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [16, 4, 8]
    })

    let activityData = [
      {userID:1, date:'2019/06/15', numSteps:3577, minutesActive:140, flightsOfStairs:16}, 
      {userID:2, date:'2019/06/15', numSteps:4294, minutesActive:138, flightsOfStairs:10}, 
      {userID:3, date:'2019/06/15', numSteps:7402, minutesActive:116, flightsOfStairs:33}, 
      {userID:4, date:'2019/06/15', numSteps:3486, minutesActive:114, flightsOfStairs:32}, 
      {userID:5, date:'2019/06/15', numSteps:11374, minutesActive:213, flightsOfStairs:13}, 
      {userID:6, date:'2019/06/15', numSteps:14810, minutesActive:287, flightsOfStairs:18}, 
      {userID:7, date:'2019/06/15', numSteps:2634, minutesActive:107, flightsOfStairs:5}
    ];
    activityInfo = new Activity(activityData);
  })
  
 
  it('should be able to calculate miles walked based on steps specified by a date', () => {
    expect(activityInfo.getDailyMiles(user1, '2019/06/15')).to.equal(2.9)
  })

  // it('should be able to return a user\s daily minutes active specified by a date', () => {
  //     expect(activityInfo.getDailyMinsActive(1, '2019/06/15').to.equal(140))
  //   })
})
