import dateUtility from "../utilities/dateUtility";
import User from "./User";

class Staff extends User {
    constructor(id, first, middle, last, isStaff, title = "", about = "", messages = [], documents = []) {
        super(id, first, middle, last, isStaff);
        this.title = title;
        this.about = about;
        this.messages = messages;
        this.documents = documents;
    }

    getAllergies() {
        const document = this.documents.join(", ");
        return document;
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

    getLatestDate(authId) {
        let latestMessage = this.getLatestMessageObject(authId);
        let latestMessageDate = new Date(latestMessage.timestamp);
        let dateToday = new Date();
        let dayDifference = dateUtility.getDateDifferenceInDays(dateToday, latestMessageDate);
        if (!latestMessage) return "-";
        else if (dayDifference < 1) return dateUtility.getFormattedTime(latestMessageDate);
        else if (dayDifference < 7) return dateUtility.getFormattedDayNow(latestMessageDate);
        else return dateUtility.getFormattedDateNoTime(latestMessageDate)
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
            staff.messages,
            staff.documents,
        );
    }
}

export default Staff;