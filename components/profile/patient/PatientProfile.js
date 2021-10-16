import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AddressTab from "./AddressTab";
import MedicalTab from "./MedicalTab";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import LoadingScreen from "../../../components/LoadingScreen";
import Patient from "../../../models/Patient";
import TabStyles from "../profilecomponents/TabStyles";
import { Tab, TabView, Image, Overlay } from "react-native-elements";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import UploadProfilePicture from "../profilecomponents/UploadProfilePicture";
import FloatingMenu from "./FloatingMenu";
import { FAB } from "react-native-elements";
import UploadDocument from "../../documentUpload/UploadDocument";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function PatientProfile({ navigation, route }) {
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
  const uploadButtonAction = () => {
    toggleDocumentOverlay();
    setDocumentVisible(true);
  };

  // Speed dial states
  const [open, setOpen] = useState(false);

  // Function to navigate to patient profile comments
  const openComments = () => {
    navigation.navigate("Comment", { user });

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

    const renderPage = () => {
      if (loading) {
        return <LoadingScreen />;
      }

      return (
        <>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{ uri: profilePicture }}
              PlaceholderContent={<ActivityIndicator />}
              onPress={() => {
                !passedUser ? setSheetVisible(true) : {};
              }}
            />
            <Text style={styles.name}>{user.getFullName()}</Text>
          </View>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={TabStyles.tabIndicatorStyle}
            variant="primary"
          >
            <Tab.Item
              title="profile"
              titleStyle={TabStyles.tabText}
              buttonStyle={[
                index == 0 ? TabStyles.activeTab : TabStyles.inactiveTab,
              ]}
            />

            <Tab.Item
              title="address"
              titleStyle={TabStyles.tabText}
              buttonStyle={[
                index == 1 ? TabStyles.activeTab : TabStyles.inactiveTab,
              ]}
            />

            <Tab.Item
              title="medical"
              titleStyle={TabStyles.tabText}
              buttonStyle={[
                index == 2 ? TabStyles.activeTab : TabStyles.inactiveTab,
              ]}
            />
          </Tab>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAwareScrollView>
              <TabView value={index} onChange={setIndex} animationType="timing">
                <TabView.Item style={{ width: "100%" }}>
                  <GlobalProfileTab user={user} setUser={setUser} />
                </TabView.Item>

                <TabView.Item style={{ width: "100%" }} animationType="timing">
                  <AddressTab user={user} setUser={setUser} />
                </TabView.Item>

                <TabView.Item style={{ width: "100%" }} animationType="timing">
                  <MedicalTab user={user} setUser={setUser} />
                </TabView.Item>
              </TabView>

              {/* Bottom Sheet Navigation */}
              <BottomSheetNav
                visible={sheetVisible}
                setVisible={setSheetVisible}
                toggleOverlay={toggleOverlay}
              />
              {/* Bottom Sheet Navigation */}

              {/* Overlay For Uploading a Profile Picture */}
              <Overlay
                isVisible={overlayVisible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{
                  backgroundColor: colorDefaults.backDropColor,
                }}
                animationType="slide"
                transparent
              >
                <UploadProfilePicture
                  setProfilePicture={setProfilePicture}
                  toggleOverlay={toggleOverlay}
                  user={user}
                />
              </Overlay>
              {/* Overlay For Uploading a Profile Picture */}

              {/* document upload */}
              <Overlay
                isVisible={overlayDocumentVisible}
                onBackdropPress={toggleDocumentOverlay}
                overlayStyle={{ backgroundColor: colorDefaults.backDropColor }}
                animationType="slide"
                transparent
              >
                <UploadDocument
                  //setProfilePicture={setProfilePicture}
                  toggleDocumentOverlay={toggleDocumentOverlay}
                  patient={user.id}
                  staff={authUserId}
                  patientName={user.getFullName()}
                />
              </Overlay>
              {/* Document Upload */}
            </KeyboardAwareScrollView>
          </TouchableWithoutFeedback>
          {/* This helps Keyboard Avoiding View function properly by moving the whole display up */}
          <View style={{ height: 100 }} />

          {/*
             Floating action button for menu which contains add comment and result upload. 
             Uses conditional as we don't want patients to be able to upload results. 

             - Patients should only see view comments FAB on their profile.
             - Staff should be able to see a speed dial FAB that gives them view commenet and upload document
               as options.
          */}
          {passedUser ? (
            <FloatingMenu
              open={open}
              setOpen={setOpen}
              openComments={openComments}
              uploadButtonAction={uploadButtonAction}
            />
          ) : (
            <FAB
              icon={{ name: "comment", color: "#fff" }}
              onPress={openComments}
              color={colorDefaults.primary}
              placement="right"
              size="large"
            />
          )}
        </>
      );
    };

    return renderPage();
  };
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",
  },
});
