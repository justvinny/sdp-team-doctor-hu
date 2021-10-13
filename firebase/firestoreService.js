import firebase, { db } from "./firebaseConfig";


const COLLECTION_USERS = "users";


// Read operations.
const getAllStaff = async () => {
  try {
    const querySnapshot = await db
      .collection(COLLECTION_USERS)
      .where("isStaff", "==", true)
      .get();
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    return "Error getting staff: " + error;
  }
};

const getAllUsers = () =>
  db
    .collection(COLLECTION_USERS)
    .get()
    .then((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    .catch((error) => "Error getting users: " + error);

const getAllStaffLive = (id) =>
  db.collection(COLLECTION_USERS).where("isStaff", "==", true);

const getAllPatients = async () => {
  try {
    const querySnapshot = await db
      .collection(COLLECTION_USERS)
      .where("isStaff", "==", false)
      .get();
    console.log(querySnapshot);
    return querySnapshot.docs.map((doc) => doc.data());
  } catch (error) {
    return "Error getting patients: " + error;
  }
};

const getUserById = async (id) => {
  try {
    const doc = await db.collection(COLLECTION_USERS).doc(id).get();
    return doc.data();
  } catch (error) {
    return "Error getting user: " + error;
  }
};

const getLiveMessages = (id) => db.collection(COLLECTION_USERS).doc(id);

const getUserLive = (id) => db.collection(COLLECTION_USERS).doc(id);

// Create operations.
const createPatient = (id, first, middle, last, isStaff) => {
  const newPatient = {
    id,
    name: {
      first,
      middle,
      last,
    },
    isStaff,
    address: {
      street: "",
      suburb: "",
      city: "",
      post: "",
    },
    bloodType: "",
    birthDate: "",
    weight: 0,
    height: 0,
    allergies: [],
    staffNotes: [],
    medicalResults: [],
  };

  return newPatient;
};

const createStaff = (id, first, middle, last, isStaff) => {
  const newStaff = {
    id,
    name: {
      first,
      middle,
      last,
    },
    isStaff,
    title: "",
    about: "",
    messages: [],
    medicalResults: [],
  };

  return newStaff;
};

/* 
    addUser is a helper method only.
    Use createPatient or createStaff above for the actual account creation.
*/
const createUser = (id, first, middle, last, isStaff) => {
  let newUser;

  if (isStaff) {
    newUser = createStaff(id, first, middle, last, isStaff);
  } else {
    newUser = createPatient(id, first, middle, last, isStaff);
  }

  return db.collection(COLLECTION_USERS).doc(newUser.id).set(newUser);
};

// Update operations.
const updateFirstName = async (id, first) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "name.first": first });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateMiddleName = async (id, middle) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "name.middle": middle });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateLastName = async (id, last) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ "name.last": last });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateFullName = async (id, name) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ name });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateStreet = async (id, street) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "address.street": street });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateSuburb = async (id, suburb) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "address.suburb": suburb });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateCity = async (id, city) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "address.city": city });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updatePost = async (id, post) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ "address.post": post });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updatePicture = async (id, picture) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ picture });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateFullAddress = async (id, address) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ address });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateBirthDate = async (id, birthDate) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ birthDate });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateBloodtype = async (id, bloodType) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ bloodType });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateHeight = async (id, height) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ height });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateWeight = async (id, weight) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ weight });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateAllergies = async (id, allergies) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ allergies });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

// const updateMedicalResults = async (id, medicalResults) => {
//   try {
//     await db.collection(COLLECTION_USERS).doc(id).update({ medicalResults });
//     return "Sucessfully updated!";
//   } catch (error) {
//     return "Failed to update: " + error;
//   }
// };

const updateStaffNotes = async (id, staffNotes) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ staffNotes });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateAbout = async (id, about) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ about });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const updateTitle = async (id, title) => {
  try {
    await db.collection(COLLECTION_USERS).doc(id).update({ title });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const addStaffNote = async (id, note) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ staffNotes: firebase.firestore.FieldValue.arrayUnion(note) });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const addAllergy = async (id, allergy) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({ allergies: firebase.firestore.FieldValue.arrayUnion(allergy) });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

//patients
const addMedicalResult = async (id, medicalResult) => {
  try {
    await db
      .collection(COLLECTION_USERS)
      .doc(id)
      .update({
        medicalResults: firebase.firestore.FieldValue.arrayUnion(medicalResult),
      });
    return "Sucessfully updated!";
  } catch (error) {
    return "Failed to update: " + error;
  }
};

const addMessage = async (id, message) => {
    try {
        await db.collection(COLLECTION_USERS)
            .doc(id)
            .update({ messages: firebase.firestore.FieldValue.arrayUnion(message) });
        return "Sucessfully updated!";
    } catch (error) {
        return "Failed to update: " + error;
    }
};


  const getMedicalResults = (id) => db.collection(COLLECTION_USERS).doc(id);

  const updateMedicalResults = async (id, url, patient, staff, time, title) => {

    try {
      await db
        .collection(COLLECTION_USERS)
        .doc(id) 
        .update({
          medicalResults: firebase.firestore.FieldValue.arrayRemove({"patientId": patient, "staffId": staff, "timestamp":time, "title":title, "url": url})
        });
        console.log("deleting medical doc");
      return "Sucessfully updated!";
    } catch (error) {
      return "Failed to update: " + error;
    }
  };
  
  const deleteDocument = async (obj) => {
    try {
      await db
        .collection(COLLECTION_USERS)
        .doc(obj.patientId)
        .update({
          medicalResults: firebase.firestore.FieldValue.arrayRemove({
            patientId: obj.patientId,
            staffId: obj.staffId,
            timestamp: obj.timestamp,
            title: obj.title,
            url: obj.url,
          }),
        });
  
      await db
        .collection(COLLECTION_USERS)
        .doc(obj.staffId)
        .update({
          medicalResults: firebase.firestore.FieldValue.arrayRemove({
            patientId: obj.patientId,
            staffId: obj.staffId,
            timestamp: obj.timestamp,
            title: obj.title,
            url: obj.url,
          }),
        });
      return "Document successfully delete from database";
    } catch (error) {
      return "Error removing Document: " + error;
    }
  };


  // const deleteDocument = async (obj) => {
  //   try {
  
  //     await db
  //       .collection(COLLECTION_USERS)
  //       .doc(obj.patientId)
  //       .update(firebase.firestore.FieldValue.arrayRemove(obj.url));
  
  //     await db
  //       .collection(COLLECTION_USERS)
  //       .doc(obj.staffId)
  //       .update(firebase.firestore.FieldValue.arrayRemove(obj.url));
  
  //     return "Document successfully delete from database";
  //   } catch (error) {
  //     return "Error removing Document: " + error;
  //   }
  // };


// Delete operations.
const deleteUser = async (userId) => {
  try {
    await db.collection("users").doc(userId).delete();
    return "User successfully deleted.";
  } catch (error) {
    return "Error removing User: " + error;
  }
};

const firestoreService = {
    getAllStaff,
    getAllStaffLive,
    getAllPatients,
    getAllUsers,
    getUserById,
    getLiveMessages,
    getUserLive,
    createUser,
    createPatient,
    createStaff,
    updateAbout,
    updateFullAddress,
    updateStreet,
    updateSuburb,
    updatePicture,
    updateCity,
    updatePost,
    updateAllergies,
    updateBirthDate,
    updateBloodtype,
    updateHeight,
    updateMedicalResults,
    updateFullName,
    updateFirstName,
    updateMiddleName,
    updateLastName,
    updateStaffNotes,
    updateTitle,
    updateWeight,
    addStaffNote,
    addAllergy,
    addMedicalResult,
    addMessage,
    deleteUser,
    getMedicalResults,
    deleteDocument 
   
}

export default firestoreService;
