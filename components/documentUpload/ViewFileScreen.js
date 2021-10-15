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

const viewFileScreen = ({ navigation }) => {
  // Overlay Controls for Uploading Profile Picture
  const [sheetVisible, setSheetVisible] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const toggleOverlay = () => {
    setOverlayVisible(!overlayVisible);
  };

  // Collects the user's ID.
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
    const unsubscribe = firestoreService
      .getUserLive(authUserId)
      .onSnapshot((doc) => {
        const data = doc.data();
        setUser(data);
        setDocuments(data.medicalResults);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const removePicture = async (deleteIndex) => {
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

  const removePictureAlert = async (i) => {
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
            removePicture(i);
          },
          style: "destructive",
        },
      ]
    );
  };

  const updatedTask = async (newName, index) => {
    try {
      firestoreService.deleteMedicalResultsPatient(documents[index]);

      documents[index].title = newName;
      setDocuments([...documents]);
      firestoreService.updateMedicalResults(
        documents[index].staffId,
        documents
      );

      firestoreService.addMedicalResult(
        documents[index].patientId,
        documents[index]
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const editTask = (index) => {
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
          onPress: (newName) => updatedTask(newName, index),
        },
      ]
    );
  };

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    } else if (!loading) {
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
                  {user.isStaff ? (
                    <View style={styles.icon}>
                      <Icon
                        name={"delete"}
                        size={30}
                        color="#e34c46"
                        onPress={() => {
                          setPatientId(l.patientId);
                          removePictureAlert(i);
                        }}
                      />
                      <Icon
                        name={"edit"}
                        size={30}
                        color="#4695e3"
                        onPress={() => {
                          editTask(i);
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
