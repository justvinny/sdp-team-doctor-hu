import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
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
import { FAB } from 'react-native-elements';
import UploadDocumentButton from '../../documentUpload/UploadDocumentButton'
import UploadDocument from '../../documentUpload/UploadDocument';

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
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: colorDefaults.backDropColor }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            bounces="false"
            style={{ flex: 1 }}
            height={"100%"}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
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

            {/* Overlay For Uploading & Profile Picture */}
            <Overlay
              isVisible={overlayVisible}
              onBackdropPress={toggleOverlay}
              overlayStyle={{ backgroundColor: colorDefaults.backDropColor }}
              animationType="slide"
              transparent
            >
              <UploadProfilePicture
                setProfilePicture={setProfilePicture}
                toggleOverlay={toggleOverlay}
                user={user}
              />
            </Overlay>

            {/* Bottom Sheet Navigation */}
            <BottomSheetNav
              visible={sheetVisible}
              setVisible={setSheetVisible}
              toggleOverlay={toggleOverlay}
            />

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
                    patient= {user.id}
                    staff = {authUserId}
                    patientName = {user.getFullName()}
                  />
            </Overlay>

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
            
          </ScrollView>
        </TouchableWithoutFeedback>
        {/* This helps Keyboard Avoiding View function properly by moving the whole display up */}
        <View style={{ height: 100 }} />

        <UploadDocumentButton 
          visible={documentVisible}
          setDocumentVisible={setDocumentVisible}
          toggleDocumentOverlay={toggleDocumentOverlay}
         />
        
      </KeyboardAvoidingView>
    );
  };

  return renderPage();
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
});
