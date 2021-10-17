import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import dateUtility from "../../utilities/dateUtility";
import colorDefaults from "../../theme/colorDefaults";
import { ListItem, Icon, Overlay } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import ViewDocument from "../documentUpload/ViewDocument";

// View Document/Files main screen
const viewFileScreen = ({ navigation, route }) => {
  // Overlay Controls for viewing files
  const [sheetVisible, setSheetVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // populate the states
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [url, setURL] = useState("");
  const [patientId, setPatientId] = useState();
  const [staffId, setStaffId] = useState();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Upload Documents",
    });
  }, []);

  //sets useStates
  useEffect(() => {
    let userId = authUserId;
    if (route.params.passedId !== undefined) {
      userId = route.params.passedId;
    }
    const unsubscribe = firestoreService
      .getUserLive(userId)
      .onSnapshot((doc) => {
        const data = doc.data();
        setUser(data);
        setDocuments(data.medicalResults);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  //removing a document or picture
  const removeDocument = async (deleteIndex) => {
    try {
      Alert.alert(
        "Document '" + documents[deleteIndex].title + "'",
        "deleted successfully.",
        [
          {
            text: "Thanks!",
          },
        ]
      );

      firestoreService.deleteMedicalResultsBoth(documents[deleteIndex]);
    } catch (error) {
      alert(error.message);
    }
  };

  //alert to confirm removing
  const removeDocumentAlert = async (i) => {
    Alert.alert(
      "Remove Document",
      "Are you sure you want to remove the document " +
        documents[i].title +
        "?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            removeDocument(i);
          },
          style: "destructive",
        },
      ]
    );
  };

  //updating or editing document
  const updatedDocument = async (newName, index) => {
    try {
      //remove document from patient account
      firestoreService.deleteMedicalResultsPatient(documents[index]);

      //update record on staff account
      // updates by duplicating the array with desired changes
      documents[index].title = newName;
      setDocuments([...documents]);
      firestoreService.updateMedicalResults(
        documents[index].staffId,
        documents
      );

      //add duplicated document with new edit to patient account
      firestoreService.addMedicalResult(
        documents[index].patientId,
        documents[index]
      );
    } catch (error) {
      alert(error.message);
    }
  };

  // alert to get edit text and confirm edit
  const editDocument = (index) => {
    Alert.prompt(
      "Enter new document title ",
      "Current: " + documents[index].title,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (newName) => updatedDocument(newName, index),
        },
      ]
    );
  };

  const renderPage = () => {
    //if loading
    if (loading) {
      return <LoadingScreen />;
    } else if (!loading) {
      //if there are no documents in account and loading is complete
      if (documents?.length < 1 || documents === undefined) {
        return (
          <View style={styles.container}>
            <MaterialIcons
              name="attachment"
              size={50}
              color={colorDefaults.primary}
              style={styles.center}
            />
            <Text>No Documents</Text>
          </View>
        );
      }
    }
    //display the document on account
    return (
      <ScrollView>
        <View>
          {documents?.map((l, i) => (
            <ListItem key={i} bottomDivider style={styles.container}>
              <Icon
                name={"pageview"}
                size={38}
                color="#838aa1"
                onPress={() => {
                  toggleOverlay();
                  setSheetVisible(false);
                  setURL(l.url);
                  setPatientId(l.patientId);
                  setStaffId(l.staffId);
                  setTitle(l.title);
                  setDate(l.timestamp);
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
              </ListItem.Content>
              <View style={styles.margin}>
                <>
                  {user.isStaff ? ( //if user is a staff they can edit and delete documents
                    <View style={styles.icon}>
                      <Icon
                        name={"delete"}
                        size={30}
                        color="#e34c46"
                        onPress={() => {
                          setPatientId(l.patientId);
                          removeDocumentAlert(i);
                        }}
                      />
                      <Icon
                        name={"edit"}
                        size={30}
                        color="#4695e3"
                        onPress={() => {
                          editDocument(i);
                        }}
                      />
                    </View>
                  ) : (
                    <View></View>
                  )}
                </>
                <Text style={[styles.date, styles.subText]}>
                  {dateUtility.getFormattedDateNow(new Date(l.timestamp))}
                </Text>
              </View>
            </ListItem>
          ))}
        </View>

        <Overlay
          isVisible={overlayVisible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ backgroundColor: colorDefaults.backDropColor }}
          animationType="slide"
          transparent
        >
          <ViewDocument
            url={url}
            patientId={patientId}
            staffId={staffId}
            title={title}
            date={date}
          />
        </Overlay>
      </ScrollView>
    );
  };

  return <View>{renderPage()}</View>;
};

export default viewFileScreen;

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colorDefaults.backDropColor,
  },
  center: {
    marginTop: "60%",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
  },
  date: {
    alignSelf: "flex-end",
  },
  subText: {
    fontSize: 12,
    color: "grey",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  margin: {
    justifyContent: "flex-end",
  },
});
