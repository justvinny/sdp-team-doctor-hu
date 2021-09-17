import React, { useLayoutEffect } from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import PatientProfile from "./patient/PatientProfile";
import StaffProfile from "./staff/StaffProfile";
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
      return <StaffProfile navigation={navigation} route={route} />;
    }
    return <PatientProfile navigation={navigation} />;
  };
  return renderProfile();
};

export default ProfileSelection;
