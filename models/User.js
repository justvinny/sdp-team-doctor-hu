class User {
    constructor(id, first, middle, last, isStaff) {
        this.id = id;
        this.name = {
            first,
            middle,
            last
        };
        this.isStaff = isStaff;
    }

    getFullName() {
        return (this.name.middle)
            ? `${this.name.first} ${this.name.middle} ${this.name.last}`
            : `${this.name.first} ${this.name.last}`;
    }
}

export default User;