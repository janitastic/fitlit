import {
  expect
} from 'chai';
import User from '../src/User';

describe('User', () => {
  let user1;
  let user2;
  let user3;

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

    user2 = new User({
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 5000,
      "friends": [9, 18, 24, 19]
    })

    user3 = new User({});
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be have an id number', () => {
    expect(user2.id).to.equal(2)
    expect(user3.id).to.equal(undefined)
  })

  it('should have a name', () => {
    expect(user1.name).to.equal("Luisa Hane");
    expect(user3.name).to.equal(undefined);
  })

  it('should have an email address', () => {
    expect(user1.email).to.equal("Diana.Hayes1@hotmail.com");
    expect(user2.email).to.equal("Dimitri.Bechtelar11@gmail.com");
    expect(user3.email).to.equal(undefined);
  })

  it('should have a physical address', () => {
    expect(user2.address).to.equal("30086 Kathryn Port, Ciceroland NE 07273");
    expect(user3.address).to.equal(undefined);
  })

  it('should have a stride length', () => {
    expect(user1.strideLength).to.equal(4.3);
  })

  it('should have a daily step goal', () => {
    expect(user1.dailyStepGoal).to.equal(10000);
  })

  it('should have an array of friends', () => {
    expect(user2.friends).to.deep.equal([9, 18, 24, 19]);
  })

  it('should be able to return a user\'s first name', () => {
    expect(user2.getFirstName()).to.equal('Jarvis')
  })
})
