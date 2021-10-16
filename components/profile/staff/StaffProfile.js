import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  ActivityIndicator,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import Staff from "../../../models/Staff";
import AboutTab from "./AboutTab";
import { Tab, TabView, Image, Overlay } from "react-native-elements";
import TabStyles from "../profilecomponents/TabStyles";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import LoadingScreen from "../../LoadingScreen";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import UploadProfilePicture from "../profilecomponents/UploadProfilePicture";
import { defaultPicture } from "../profilecomponents/DefaultPicture";

export default function StaffProfile({ navigation, route }) {
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
        setProfilePicture(data.picture ? data.picture : defaultPicture);
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
          <ScrollView bounces="false" style={{ flex: 1 }}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={{
                  uri: profilePicture,
                }}
                PlaceholderContent={<ActivityIndicator />}
                onPress={() => {
                  !passedUser ? setSheetVisible(true) : {};
                }}
              />
              <Text style={styles.name}>{Staff.getFullName(user.name)}</Text>
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

            <Tab
              value={index}
              onChange={setIndex}
              indicatorStyle={TabStyles.tabIndicatorStyle}
              style={TabStyles.activeTab}
            >
              <Tab.Item
                title="profile"
                titleStyle={TabStyles.tabText}
                buttonStyle={[
                  index == 0 ? TabStyles.activeTab : TabStyles.inactiveTab,
                ]}
                //buttonStyle={TabStyles.activeTab}
              />

              <Tab.Item
                title="about"
                titleStyle={TabStyles.tabText}
                buttonStyle={[
                  index == 1 ? TabStyles.activeTab : TabStyles.inactiveTab,
                ]}
              />
            </Tab>

            <TabView value={index} onChange={setIndex} animationType="timing">
              <TabView.Item style={{ width: "100%" }}>
                <GlobalProfileTab user={user} setUser={setUser} />
              </TabView.Item>

              <TabView.Item style={{ width: "100%" }} animationType="timing">
                <AboutTab user={user} setUser={setUser} />
              </TabView.Item>
            </TabView>
          </ScrollView>
        </TouchableWithoutFeedback>
        {/* This helps Keyboard Avoiding View function properly by moving the whole display up */}
        <View style={{ height: 100 }} />
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
