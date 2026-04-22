class User {
  #id;
  #username;
  #email;
  #password;
  #role;
  #avatar;
  #readingList;

  constructor({ id, username, email, password, role, avatar, readingList = [] }) {
    this.#id = id;
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#role = role;
    this.#avatar = avatar;
    this.#readingList = readingList;
  }

  getId() { return this.#id; }
  getUsername() { return this.#username; }
  getEmail() { return this.#email; }
  getRole() { return this.#role; }
  getAvatar() { return this.#avatar; }
  getReadingList() { return [...this.#readingList]; }

  isAdmin() { return this.#role === 'ADMIN'; }
  isLibrarian() { return this.#role === 'LIBRARIAN'; }
  isMember() { return this.#role === 'USER'; }

  toJSON() {
    return {
      id: this.#id,
      username: this.#username,
      email: this.#email,
      role: this.#role,
      avatar: this.#avatar,
      readingList: this.#readingList
    };
  }
}

module.exports = User;
