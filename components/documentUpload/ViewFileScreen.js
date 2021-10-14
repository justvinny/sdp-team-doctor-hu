import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import AuthContext from "../../context/AuthContext";
import firestoreService from "../../firebase/firestoreService";
import LoadingScreen from "../LoadingScreen";
import dateUtility from "../../utilities/dateUtility";
import colorDefaults from "../../theme/colorDefaults";
import { ListItem, Icon, Overlay, Swipeable } from "react-native-elements";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
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
  // I set the user but don't use the data from user this as I get an error undefined is not an object.
  // Not sure how to fix this yet.
  const [user, setUser] = useState({});
  // Just used loading as was copying from other classes on what I had done.
  const [loading, setLoading] = useState(true);

  const [documents, setDocuments] = useState([]);
  const [url, setURL] = useState("");
  const [patientId, setPatientId] = useState();
  const [staffId, setStaffId] = useState();
  const [staff, setIsStaff] = useState(false);
  const [time, setTime] = useState();
  const [title, setTitle] = useState();
  const [test, setTest] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Previous Upload Documents",
    });
  }, []);

  // Grab the current user & set them,
  // Also set the user
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

    try{

      firestoreService.getUserById(patientId).then((data) => {
        const name = data.name.first;
        //const last = data.name.last;

        Alert.alert(
          "Document '" + documents[deleteIndex].title + "' for " + name ,
          "deleted successfully.",
          [
            {
              text: "Thanks!",
            },
          ]
        );
      });

      // Alert.alert(
      //   "Document '" + documents[deleteIndex].title + "' for " + test,
      //   "deleted successfully.",
      //   [
      //     {
      //       text: "Thanks!",
      //     },
      //   ]
      // );

      firestoreService.deleteMedicalResults(documents[deleteIndex]);

    }catch (error) {
      alert(error.message);
    }

  };

  const removePictureAlert = async (i) => {
    Alert.alert(
      "Remove Document",
      "Are you sure you want to remove the document " + documents[i].title + "?",
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

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    } else if (!loading && documents.length === 0 || !loading && user?.documents === undefined) {
      return (
        <View style={styles.container}>
          <MaterialIcons
            name="attachment"
            size={50}
            color={colorDefaults.primary}
            style={styles.center}
          />
          <Text style={styles.noMsgTxt}>No Documents</Text>
        </View>
      );
    }

    return (
      <ScrollView>
        <View>
          {documents.map((l, i) => (
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
                  setTime(l.timestamp);
                }}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.name}>{l.title}</ListItem.Title>
                {/* <ListItem.Subtitle  style={styles.subText}>{l.patientId}</ListItem.Subtitle> */}
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
                          setTitle(l.title);
                          removePictureAlert(i);
                        }}
                      />
                    {/* not implemented yet */}
                      {/* <Icon
                        name={"edit"}
                        size={30}
                        color="#4695e3"
                        onPress={() => {
                          console.log("test");
                        }}
                      /> */}
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
        <ViewDocument url={url} patientId={patientId} staffId={staffId} />
        </Overlay>
      </ScrollView>
    );
  };

  return <View style={styles.flex}>{renderPage()}</View>;
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
    fontWeight: "bold",
  },
  date: {
    alignSelf: "flex-end",
  },
  subText: {
    fontSize: 14,
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
