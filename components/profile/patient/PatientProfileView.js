import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AddressTab from "./AddressTab";
import MedicalTab from "./MedicalTab";
import LoadingScreen from "../../../components/LoadingScreen";
import TabStyles from "../profilecomponents/TabStyles";
import { Tab, TabView, Overlay } from "react-native-elements";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";

/* Code Above does not need to be touched */

// import UploadDocumentButton from "../../documentUpload/UploadDocumentButton";
import UploadDocument from "../../documentUpload/UploadDocument";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadProfilePicture from "../profilecomponents/profilePicture/UploadProfilePicture";
import ProfilePicture from "../profilecomponents/profilePicture/ProfilePicture";
import { FAB } from "react-native-elements";
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
  documentVisible,
  setDocumentVisible,
  open,
  setOpen,
  openComments,
  uploadButtonAction,
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
              overlayStyle={styles.overlayStyle}
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
              overlayStyle={styles.overlayStyle}
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
