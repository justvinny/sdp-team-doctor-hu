import React from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Tab, TabView, Overlay, FAB } from "react-native-elements";
import colorDefaults from "../../../theme/colorDefaults";
import AddressTab from "./AddressTab";
import MedicalTabController from "./MedicalTabController";
import LoadingScreen from "../../../components/LoadingScreen";
import TabStyles from "../profilecomponents/styles/TabStyles";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import UploadDocumentController from "../../documentUpload/uploadDocument/UploadDocumentController";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadProfilePictureController from "../profilecomponents/profilePicture/UploadProfilePictureController";
import ProfilePicture from "../profilecomponents/profilePicture/ProfilePicture";
import FloatingMenu from "./FloatingMenu";

export default function PatientProfileView({
  loading,
  user,
  passedUser,
  profilePicture,
  setSheetVisible,
  index,
  setIndex,
  setUser,
  sheetVisible,
  toggleOverlay,
  overlayVisible,
  setProfilePicture,
  overlayDocumentVisible,
  toggleDocumentOverlay,
  authUserId,
  open,
  setOpen,
  openComments,
  uploadButtonAction,
  openFileScreen,
}) {
  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <>
        <ProfilePicture
          user={user}
          passedUser={passedUser}
          profilePicture={profilePicture}
          setSheetVisible={setSheetVisible}
        />

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
              <TabView.Item style={styles.tabContent}>
                <GlobalProfileTab user={user} setUser={setUser} />
              </TabView.Item>

              <TabView.Item style={styles.tabContent} animationType="timing">
                <AddressTab user={user} setUser={setUser} />
              </TabView.Item>

              <TabView.Item style={styles.tabContent} animationType="timing">
                <MedicalTabController user={user} setUser={setUser} />
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
            {/* Overlay For Uploading a Profile Picture */}

            {/* document upload */}
            <Overlay
              isVisible={overlayDocumentVisible}
              onBackdropPress={toggleDocumentOverlay}
              overlayStyle={styles.overlayStyle}
              animationType="slide"
              transparent
            >
              <UploadDocumentController
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
            openFileScreen={openFileScreen}
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
}

const styles = StyleSheet.create({
  tabContent: {
    width: "100%",
  },
  overlayStyle: {
    backgroundColor: colorDefaults.backDropColor,
  },
  tabContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "stretch",
  },
});
