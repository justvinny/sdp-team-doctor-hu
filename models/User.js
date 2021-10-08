class User {
  constructor(id, first, middle, last, isStaff, picture) {
    this.id = id;
    this.name = {
      first,
      middle,
      last,
    };
    this.isStaff = isStaff;
    this.picture = picture;
  }

  getFullName() {
    return this.name.middle
      ? `${this.name.first} ${this.name.middle} ${this.name.last}`
      : `${this.name.first} ${this.name.last}`;
  }
}

export default User;
