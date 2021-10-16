import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import StaffProfileView from "./StaffProfileView";

export default function StaffProfileController({ navigation, route }) {
  // Bottom Navigation Sheet for profile picture
  const [sheetVisible, setSheetVisible] = useState(false);
  // Tab Index
  const [index, setIndex] = useState(0);
  // Passed User for search function
  const passedUser = route.params?.user;
  // Auth User
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState(passedUser ? passedUser : {});
  const [loading, setLoading] = useState(passedUser ? false : true);
  const [profilePicture, setProfilePicture] = useState(user.picture);
  // Overlay Controls for Uploading Profile Picture
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Staff Profile",
    });
  }, []);

  !passedUser &&
    useEffect(() => {
      firestoreService.getUserById(authUserId).then((data) => {
        setUser(data);
        setProfilePicture(data.picture);
        setLoading(false);
      });
    }, []);

  return (
    <StaffProfileView
      loading={loading}
      profilePicture={profilePicture}
      passedUser={passedUser}
      setSheetVisible={setSheetVisible}
      user={user}
      overlayVisible={overlayVisible}
      toggleOverlay={toggleOverlay}
      setProfilePicture={setProfilePicture}
      sheetVisible={sheetVisible}
      index={index}
      setIndex={setIndex}
      setUser={setUser}
    />
  );
}
