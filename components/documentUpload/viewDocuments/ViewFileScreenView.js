import React, { } from "react";
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";
import LoadingScreen from "../../LoadingScreen";
import dateUtility from "../../../utilities/dateUtility";
import colorDefaults from "../../../theme/colorDefaults";
import { ListItem, Icon, Overlay } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import ViewDocumentController from "../viewSingleDocument/ViewDocumentController";

// View Document/Files main screen
const ViewFileScreenView = ({ 
    loading,
    documents,
    url,
    patientId,
    staffId,
    title,
    overlayVisible,
    toggleOverlay,
    date,
    setDate,
    setPatientId,
    setStaffId,
    setSheetVisible,
    setTitle,
    user,
    removeDocumentAlert,
    editDocument,
    setURL,
}) => {
 
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
          <ViewDocumentController
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

export default ViewFileScreenView;

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
