import {
  expect
} from 'chai';
import Activity from '../src/Activity';
import User from '../src/User';


describe('Activity', () => {
   let activityInfo;
   let activityInfo2;
   let user1;
   let user2;

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

    user2 = new User({
      id: 2,
      name: "Bob Sample",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Samplebob1@hotmail.com",
      strideLength: 0,
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
    })

    let activityData = [
      {userID:1, date:'2019/06/15', numSteps:3577, minutesActive:140, flightsOfStairs:16},
      {userID:2, date:'2019/06/15', numSteps:4294, minutesActive:138, flightsOfStairs:10},
      {userID:3, date:'2019/06/15', numSteps:7402, minutesActive:116, flightsOfStairs:33},
      {userID:4, date:'2019/06/15', numSteps:3486, minutesActive:114, flightsOfStairs:32},
      {userID:5, date:'2019/06/15', numSteps:11374, minutesActive:213, flightsOfStairs:13},
      {userID:6, date:'2019/06/15', numSteps:14810, minutesActive:287, flightsOfStairs:18},
      {userID:7, date:'2019/06/15', numSteps:2634, minutesActive:107, flightsOfStairs:5},
      {userID:1, date:'2019/06/16', numSteps:6637, minutesActive:175, flightsOfStairs:36},
      {userID:1, date:'2019/06/17', numSteps:14329, minutesActive:168, flightsOfStairs:18},
      {userID:1, date:'2019/06/18', numSteps:4419, minutesActive:165, flightsOfStairs:33},
      {userID:1, date:'2019/06/19', numSteps:8429, minutesActive:275, flightsOfStairs:2},
      {userID:1, date:'2019/06/20', numSteps:14478, minutesActive:140, flightsOfStairs:12},
      {userID:1, date:'2019/06/21', numSteps:6760, minutesActive:135, flightsOfStairs:6},
    ];
    activityInfo = new Activity(activityData);
    activityInfo2 = new Activity([{userID:2, date:'2019/06/15', numSteps:3577, minutesActive:140, flightsOfStairs:16}]);
  })

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(activityInfo).to.be.an.instanceof(Activity)
  })

  it('should be able to store an array of user activity data', () => {
    activityInfo.getUserFilteredData(user1);
    expect(activityInfo.userFilteredData).to.deep.equal([
      {userID:1, date:'2019/06/15', numSteps:3577, minutesActive:140, flightsOfStairs:16},
      {userID:1, date:'2019/06/16', numSteps:6637, minutesActive:175, flightsOfStairs:36},
      {userID:1, date:'2019/06/17', numSteps:14329, minutesActive:168, flightsOfStairs:18},
      {userID:1, date:'2019/06/18', numSteps:4419, minutesActive:165, flightsOfStairs:33},
      {userID:1, date:'2019/06/19', numSteps:8429, minutesActive:275, flightsOfStairs:2},
      {userID:1, date:'2019/06/20', numSteps:14478, minutesActive:140, flightsOfStairs:12},
      {userID:1, date:'2019/06/21', numSteps:6760, minutesActive:135, flightsOfStairs:6},
    ])
  })

  it('should be able to isolate and store a single day\'s worth of data for a single user', () => {
    activityInfo.getUserFilteredData(user1);
    activityInfo.getSingleDayData('2019/06/17');
    expect(activityInfo.singleDayData).to.deep.equal({userID:1, date:'2019/06/17', numSteps:14329, minutesActive:168, flightsOfStairs:18})
  })

  it('should be able to store an array of user activity data for a single date for all users', () => {
    activityInfo.getAllUserDataSingleDate('2019/06/15');
    expect(activityInfo.allUserSingleDayData).to.deep.equal([
      {userID:1, date:'2019/06/15', numSteps:3577, minutesActive:140, flightsOfStairs:16},
      {userID:2, date:'2019/06/15', numSteps:4294, minutesActive:138, flightsOfStairs:10},
      {userID:3, date:'2019/06/15', numSteps:7402, minutesActive:116, flightsOfStairs:33},
      {userID:4, date:'2019/06/15', numSteps:3486, minutesActive:114, flightsOfStairs:32},
      {userID:5, date:'2019/06/15', numSteps:11374, minutesActive:213, flightsOfStairs:13},
      {userID:6, date:'2019/06/15', numSteps:14810, minutesActive:287, flightsOfStairs:18},
      {userID:7, date:'2019/06/15', numSteps:2634, minutesActive:107, flightsOfStairs:5},
    ])
  })

  it('should be able to return a user\'s daily steps', () => {
    expect(activityInfo.getDailySteps(user1, '2019/06/15')).to.equal(3577)
  })

  it('should be able to return a user\'s weekly steps', () => {
    expect(activityInfo.getWeeklySteps(user1, '2019/06/21')).to.deep.equal([6760, 14478, 8429, 4419, 14329, 6637, 3577])
  })

  it('should be able to return a user\'s weekly total flights climbed', () => {
    expect(activityInfo.getWeeklyTotalFlights(user1, '2019/06/21')).to.equal(123)
  })

  it('should be able to return a user\'s weekly total active minutes', () => {
    expect(activityInfo.getWeeklyTotalActiveMinutes(user1, '2019/06/21')).to.equal(1198)
  })

  it('should be able to return a user\'s daily flights climbed', () => {
    expect(activityInfo.getDailyFlights(user1, '2019/06/15')).to.equal(16)
  })

  it('should be able to calculate miles walked based on steps specified by a date', () => {
    expect(activityInfo.getDailyMiles(user1, '2019/06/15')).to.equal(2.9);
    expect(activityInfo.getDailyMiles(user2, '2019/06/15')).to.equal(0);
  })

  it('should be able to return a user\'s daily minutes active specified by a date', () => {
    expect(activityInfo.getDailyMinsActive(user1, '2019/06/15')).to.equal(140)
  })

  it('should be able to call up how many minutes a user was active, on average, for a given week', () => {
    expect(activityInfo.getAvgDailyMinsActive(user1, '2019/06/15')).to.equal(171)
  })

  it('should be able to answer whether a user met their step goal on a given day', () => {
    expect(activityInfo.checkStepGoalStatus(user1, '2019/06/15')).to.equal(false)
  })

  it('should be able to find all the days when a user exceeded their step goal', () => {
    expect(activityInfo.findDaysOverStepGoal(user1)).to.deep.equal(['2019/06/17', '2019/06/20']);
    expect(activityInfo.findDaysOverStepGoal(user2)).to.deep.equal([])
  })

  it('should be able to find a user\'s all time stair-climbing record', () => {
    expect(activityInfo.findMostClimbedFlights(user1)).to.equal(36)
  })

  it('should be able to return a user\'s all-time average flights climbed', () => {
    expect(activityInfo.findUserAvgFlights(user1)).to.equal(17.5)
  })

  it('should be able to find, for all users, the average number of climbed flights on a given day', () => {
    expect(activityInfo.findCommunityAvgFlights('2019/06/15')).to.equal(18.1)
  })

  it('should be able to find, for all users, the average number of steps taken on a given day', () => {
    expect(activityInfo.findCommunityAvgSteps('2019/06/15')).to.equal(6796)
  })

  it('should be able to find, for all users, the average number of minutes active on a given day', () => {
    expect(activityInfo.findCommunityAvgMinutes('2019/06/15')).to.equal(159)
  })
})
