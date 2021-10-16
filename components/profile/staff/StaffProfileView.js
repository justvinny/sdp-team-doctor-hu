import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AboutTab from "./AboutTab";
import { Tab, TabView, Overlay } from "react-native-elements";
import TabStyles from "../profilecomponents/styles/TabStyles";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import LoadingScreen from "../../LoadingScreen";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import UploadProfilePictureController from "../profilecomponents/profilePicture/UploadProfilePictureController";
import ProfilePicture from "../profilecomponents/profilePicture/ProfilePicture";

export default function StaffProfileView({
  loading,
  profilePicture,
  passedUser,
  setSheetVisible,
  user,
  overlayVisible,
  toggleOverlay,
  setProfilePicture,
  sheetVisible,
  index,
  setIndex,
  setUser,
}) {
  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingViewStyle}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView bounces="false" style={styles.scrollViewStyle}>
            <ProfilePicture
              profilePicture={profilePicture}
              passedUser={passedUser}
              setSheetVisible={setSheetVisible}
              user={user}
            />

            {/* Overlay For Uploading & Profile Picture */}
            <Overlay
              isVisible={overlayVisible}
              onBackdropPress={toggleOverlay}
              overlayStyle={styles.overlayStyle}
              animationType="slide"
              transparent
            >
              <UploadProfilePictureController
                setProfilePicture={setProfilePicture}
                toggleOverlay={toggleOverlay}
                user={user}
              />
            </Overlay>
            {/* Overlay For Uploading & Profile Picture */}

            {/* Bottom Sheet Navigation */}
            <BottomSheetNav
              visible={sheetVisible}
              setVisible={setSheetVisible}
              toggleOverlay={toggleOverlay}
            />
            {/* Bottom Sheet Navigation */}

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
              <TabView.Item style={styles.tabContent}>
                <GlobalProfileTab user={user} setUser={setUser} />
              </TabView.Item>

              <TabView.Item style={styles.tabContent} animationType="timing">
                <AboutTab user={user} setUser={setUser} />
              </TabView.Item>
            </TabView>
          </ScrollView>
        </TouchableWithoutFeedback>
        {/* This view helps Keyboard Avoiding View function properly by moving the whole display up */}
        <View style={Platform.OS === "ios" ? styles.ios : styles.android} />
      </KeyboardAvoidingView>
    );
  };

  return renderPage();
}

const styles = StyleSheet.create({
  tabContent: {
    width: "100%",
  },
  overlayStyle: {
    backgroundColor: colorDefaults.backDropColor,
  },
  keyboardAvoidingViewStyle: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
  },
  scrollViewStyle: {
    flex: 1,
  },
  ios: {
    height: 100,
  },
  android: {
    height: 0,
  },
});
