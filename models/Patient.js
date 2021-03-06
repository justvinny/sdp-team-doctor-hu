import User from "./User";

class Patient extends User {
  constructor(
    id,
    first,
    middle,
    last,
    isStaff,
    picture,
    street = "",
    suburb = "",
    city = "",
    post = "",
    bloodType = "",
    birthDate = "",
    weight = 0,
    height = 0,
    allergies = [],
    staffNotes = [],
    medicalResults = []
  ) {
    super(id, first, middle, last, isStaff, picture);
    this.address = {
      street,
      suburb,
      city,
      post,
    };
    this.bloodType = bloodType;
    this.birthDate = birthDate;
    this.weight = weight;
    this.height = height;
    this.allergies = allergies;
    this.staffNotes = staffNotes;
  }

  getAllergies() {
    const allergiesString = this.allergies.join(", ");
    return allergiesString;
  }

  static patientFirestoreFactory(patient) {
    return new Patient(
      patient.id,
      patient.name.first,
      patient.name.middle,
      patient.name.last,
      patient.isStaff,
      patient.picture,
      patient.address.street,
      patient.address.suburb,
      patient.address.city,
      patient.address.post,
      patient.bloodType,
      patient.birthDate,
      patient.weight,
      patient.height,
      patient.allergies,
      patient.staffNotes,
      patient.medicalResults
    );
  }
}

export default Patient;
