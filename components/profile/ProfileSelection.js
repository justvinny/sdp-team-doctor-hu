import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import PatientProfileController from "./patient/PatientProfileController";
import StaffProfileController from "./staff/StaffProfileController";
import firestoreService from "../../firebase/firestoreService";
import Staff from "../../models/Staff";
import LoadingScreen from "../../components/LoadingScreen";

const ProfileSelection = ({ navigation, route }) => {
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Loading Profile",
    });
  }, [navigation]);

  useEffect(() => {
    firestoreService
      .getUserById(authUserId)
      .then((data) => {
        setUser(Staff.staffFirestoreFactory(data));
        setLoading(false);
      })
      .catch((error) => alert(error));
  }, []);

  const renderProfile = () => {
    if (loading) {
      return <LoadingScreen />;
    } else if (user.isStaff) {
      return <StaffProfileController navigation={navigation} route={route} />;
    }
    return <PatientProfileController navigation={navigation} route={route} />;
  };

  return renderProfile();
};

export default ProfileSelection;
