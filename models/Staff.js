import dateUtility from "../utilities/dateUtility";

class Staff {
    constructor(id, first, middle, last, isStaff, title = "", about = "", messages = []) {
        this.id = id;
        this.name = {
            first,
            middle,
            last
        };
        this.isStaff = isStaff;
        this.title = title;
        this.about = about;
        this.messages = messages;
    }

    getLatestMessageObject(authId) {
        return (this.messages.length > 0)
            ? this.messages.sort((a, b) => a.timestamp - b.timestamp)
                .filter(msg => msg.sentBy === authId || msg.sentTo === authId)
                .reverse()[0]
            : undefined;
    }
    
    getLatestMessage(authId) {
        let latestMessage = this.getLatestMessageObject(authId);
        return (latestMessage)
            ? latestMessage.message
            : "No message";
    }

    getFullName() {
        return (this.name.middle)
            ? `${this.name.first} ${this.name.middle} ${this.name.last}`
            : `${this.name.first} ${this.name.last}`;
    }

    getLatestDate(authId) {
        let latestMessage = this.getLatestMessageObject(authId);
        return (latestMessage)
            ? dateUtility.getFormattedDayNow(new Date(latestMessage.timestamp))
            : "-";
    }

    static getFullName(name) {
        return (name.middle)
            ? `${name.first} ${name.middle} ${name.last}`
            : `${name.first} ${name.last}`;
    }

    static staffFirestoreFactory(staff) {
        return new Staff(
            staff.id,
            staff.name.first,
            staff.name.middle,
            staff.name.last,
            staff.isStaff,
            staff.title,
            staff.about,
            staff.messages
        );
    }
}

export default Staff;