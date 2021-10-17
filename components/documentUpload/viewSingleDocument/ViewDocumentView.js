import React, { } from "react";
import { StyleSheet, View, Text} from "react-native";
import { WebView } from "react-native-webview";
import LoadingScreen from "../../LoadingScreen";
import dateUtility from "../../../utilities/dateUtility";

const ViewDocumentView = ({ 
  title, 
  date,
  loading1,
  loading2,
  loading3,
  patient,
  staff,
  image,
  user,
}) => {


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
            {dateUtility.getFormattedDateNow(new Date(date))}
          </Text>
        </Text>

        {/* conditonal render name so staff can see who docuemnt was loaded to and patient can see from*/}
        {user.isStaff ? (
          <Text style={styles.bold}>
            Document uploaded to:
            <Text style={styles.regular}>
              {patient.name.first} {patient.name.last}
            </Text>
          </Text>
        ) : (
          <Text style={styles.bold}>
            Document uploaded by:
            <Text style={styles.regular}>
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

export default ViewDocumentView;

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
  androidMessage: {
    position: "absolute",
    top: "40%",
    left: 0,
    margin: 16,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
