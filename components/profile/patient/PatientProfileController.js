import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import Patient from "../../../models/Patient";
import PatientProfileView from "./PatientProfileView";

export default function PatientProfileController({ navigation, route }) {
  // Bottom navigation sheet for profile picture
  const [sheetVisible, setSheetVisible] = useState(false);
  // Tab Index
  const [index, setIndex] = useState(0);
  // Passed User
  const passedUser = route?.params?.user;
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState(
    passedUser ? Patient.patientFirestoreFactory(passedUser) : {}
  );
  const [loading, setLoading] = useState(passedUser ? false : true);
  const [profilePicture, setProfilePicture] = useState(user.picture);

  // Overlay Controls for Uploading Profile Picture
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // Overlay Controls for Uploading Document
  const [documentVisible, setDocumentVisible] = useState(false);
  const [overlayDocumentVisible, setOverlayDocumentVisible] = useState(false);
  const toggleDocumentOverlay = () => {
    setOverlayDocumentVisible(!overlayDocumentVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Patient Profile",
    });
  }, []);

  !passedUser &&
    useEffect(() => {
      firestoreService.getUserById(authUserId).then((data) => {
        setUser(Patient.patientFirestoreFactory(data));
        setProfilePicture(data.picture);
        setLoading(false);
      });
    }, []);

  /* New Comment Stuff */
  const uploadButtonAction = () => {
    toggleDocumentOverlay();
    setDocumentVisible(true);
  };

  // Speed dial states
  const [open, setOpen] = useState(false);

  // Function to navigate to patient profile comments
  const openComments = () => {
    navigation.navigate("Comment", { user });
  };

  /* Return Statement */

  return (
    <PatientProfileView
      loading={loading}
      user={user}
      passedUser={passedUser}
      profilePicture={profilePicture}
      setSheetVisible={setSheetVisible}
      index={index}
      setIndex={setIndex}
      setUser={setUser}
      sheetVisible={sheetVisible}
      toggleOverlay={toggleOverlay}
      overlayVisible={overlayVisible}
      setProfilePicture={setProfilePicture}
      overlayDocumentVisible={overlayDocumentVisible}
      toggleDocumentOverlay={toggleDocumentOverlay}
      authUserId={authUserId}
      open={open}
      setOpen={setOpen}
      openComments={openComments}
      uploadButtonAction={uploadButtonAction}
    />
  );
}
