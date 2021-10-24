import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';


describe('User Repository', () => {
  let user1;
  let user2;
  let user3;
  let userRepo1;
  beforeEach(() => {
    user1 = new User ({
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [ 16, 4, 8 ]
    })
    user2 = new User (
      {
        "id": 2,
        "name": "Jarvis Considine",
        "address": "30086 Kathryn Port, Ciceroland NE 07273",
        "email": "Dimitri.Bechtelar11@gmail.com",
        "strideLength": 4.5,
        "dailyStepGoal": 5000,
        "friends": [ 9, 18, 24, 19 ]
      })
    user3 = new User ({
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [ 19, 11, 42, 33 ]
    })
    userRepo1 = new UserRepository([user1, user2, user3]);
  })
  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });
  it('should be able to fetch user data when given an ID', () =>{
    expect(userRepo1.fetchUserData(3)).to.deep.equal(user3);
  })
  it('should be able to calculate the average daily step goal amongts all users', () => {
    expect(userRepo1.getAvgStepCount()).to.equal(6666);
  })
});
