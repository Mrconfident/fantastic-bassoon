let users = [];

class User {
  constructor(id, username, password, role) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }

  static create(userData) {
    const id = Date.now().toString();
    const { username, password, role } = userData;
    const user = new User(id, username, password, role);
    users.push(user);
    return user;
  }

  static findById(id) {
    return users.find((user) => user.id === id);
  }

  static findByUsername(username) {
    return users.find((user) => user.username === username);
  }

  static getAll() {
    return users;
  }
}

module.exports = User;
