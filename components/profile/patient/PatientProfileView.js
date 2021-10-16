import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AddressTab from "./AddressTab";
import MedicalTab from "./MedicalTab";
import LoadingScreen from "../../../components/LoadingScreen";
import TabStyles from "../profilecomponents/TabStyles";
import { Tab, TabView, Overlay } from "react-native-elements";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import UploadDocumentButton from "../../documentUpload/UploadDocumentButton";
import UploadDocument from "../../documentUpload/UploadDocument";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UploadProfilePicture from "../profilecomponents/profilePicture/UploadProfilePicture";
import ProfilePicture from "../profilecomponents/profilePicture/ProfilePicture";

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

        {/* Checks if the staff is viewing the profile,
        as staff are the only ones who can view patient profiles.
        Then shows the Upload Document button*/}
        {passedUser ? (
          <UploadDocumentButton
            visible={documentVisible}
            setDocumentVisible={setDocumentVisible}
            toggleDocumentOverlay={toggleDocumentOverlay}
          />
        ) : (
          <></>
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
});
