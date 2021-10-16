import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import { WebView } from "react-native-webview";
import LoadingScreen from "../LoadingScreen";
import dateUtility from "../../utilities/dateUtility";

const ViewDocument = ({ url, patientId, staffId, title, date }) => {
  const { authUserId } = useContext(AuthContext);
  const [image, setImage] = useState(url);
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);
  const [patient, setPatient] = useState({});
  const [staff, setStaff] = useState({});
  const [user, setUser] = useState({});

  //populate the needed information
  //using three load checks to confirm all information is present and not undefined
  //need to get live names from the system to reflect any changes in real time
  useEffect(() => {
    firestoreService.getUserById(patientId).then((data) => {
      setPatient(data);
      setLoading1(false);
    });
    firestoreService.getUserById(authUserId).then((data) => {
      setUser(data);
      setLoading2(false);
    });
    firestoreService.getUserById(staffId).then((data) => {
      setStaff(data);
      setLoading3(false);
    });
  }, []);

  const renderPage = () => {
    if (loading1 || loading2 || loading3) {
      return <LoadingScreen style={styles.overlay} />;
    }
    return (
      <View style={styles.overlay}>
        <Text style={styles.bold}>
          Viewing document:
          <Text style={styles.regular}> {title}</Text>
        </Text>

        <Text style={styles.bold}>
          Uploaded on:
          <Text style={styles.regular}>
            {" "}
            {dateUtility.getFormattedDateNow(new Date(date))}
          </Text>
        </Text>

        {/* conditonal render name so staff can see who docuemnt was loaded to and patient can see from*/}
        {user.isStaff ? (
          <Text style={styles.bold}>
            Document uploaded to:
            <Text style={styles.regular}>
              {" "}
              {patient.name.first} {patient.name.last}{" "}
            </Text>
          </Text>
        ) : (
          <Text style={styles.bold}>
            Document uploaded by:
            <Text style={styles.regular}>
              {" "}
              {staff.name.first} {staff.name.last}
            </Text>
          </Text>
        )}

        {/* Webview allows for viewing of any document types */}
        <WebView style={styles.image} source={{ uri: image }} />
      </View>
    );
  };

  return renderPage();
};

export default ViewDocument;

const styles = StyleSheet.create({
  overlay: {
    width: 400,
    height: 650,
  },
  image: {
    marginTop: 20,
    width: 400,
    height: 500,
  },
  bold: {
    fontWeight: "bold",
  },
  regular: {
    fontWeight: "normal",
  },
});
