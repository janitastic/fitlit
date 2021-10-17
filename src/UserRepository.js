class UserRepository {
  constructor(users){
    this.users = users;
  }

  fetchUserData(userID) {
    const currentUser = this.users.find((user) => {
    return user.id === userID;
    })
    return currentUser
  }
}

export default UserRepository;
