import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import Staff from "../../../models/Staff";
import AboutTab from "./AboutTab";
import { BottomSheet, Tab, TabView, ListItem } from "react-native-elements";
import TabStyles from "../profilecomponents/TabStyles";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import LoadingScreen from "../../LoadingScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function StaffProfile({ navigation, route }) {
  const [sheetVisible, setSheetVisible] = useState(false);
  const list = [
    {
      title: "Change Profile Picture",
      onPress: () => {
        navigation.navigate("UploadProfilePicture");
        setSheetVisible(false);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setSheetVisible(false),
    },
  ];

  const [index, setIndex] = useState(0);
  const passedUser = route.params?.user;
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState(passedUser ? passedUser : {});
  const [loading, setLoading] = useState(passedUser ? false : true);
  let profilePicture =
    "https://firebasestorage.googleapis.com/v0/b/sdp-team-doctor-hu.appspot.com/o/profile%2FFaleiBmv1VPDbdvokrLVkroa5Em1?alt=media&token=614166b5-ea76-450d-903c-1895e0d574fd";

  let picture = user.picture;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Staff Profile",
    });
  }, []);

  !passedUser &&
    useEffect(() => {
      firestoreService.getUserById(authUserId).then((data) => {
        setUser(data);
        setLoading(false);
      });
    }, []);

  const renderPage = () => {
    if (loading) {
      return <LoadingScreen />;
    }

    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{ flex: 1, backgroundColor: colorDefaults.backDropColor }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView bounces="false" style={{ flex: 1 }}>
              <View style={styles.container}>
                <TouchableOpacity onPress={() => setSheetVisible(true)}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: picture,
                    }}
                  />
                </TouchableOpacity>
                <Text style={styles.name}>{Staff.getFullName(user.name)}</Text>
              </View>

              <BottomSheet
                isVisible={sheetVisible}
                containerStyle={{
                  backgroundColor: "rgba(0.5, 0.25, 0, 0.2",
                  marginBottom: 50,
                }}
              >
                {list.map((l, i) => (
                  <ListItem
                    key={i}
                    containerStyle={l.containerStyle}
                    onPress={l.onPress}
                  >
                    <ListItem.Content>
                      <ListItem.Title style={l.titleStyle}>
                        {l.title}
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
              </BottomSheet>

              <Tab
                value={index}
                onChange={setIndex}
                indicatorStyle={TabStyles.tabIndicatorStyle}
              >
                <Tab.Item
                  title="profile"
                  titleStyle={TabStyles.tabText}
                  style={[
                    index == 0 ? TabStyles.activeTab : TabStyles.inactiveTab,
                  ]}
                />

                <Tab.Item
                  title="about"
                  titleStyle={TabStyles.tabText}
                  style={[
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
      </SafeAreaProvider>
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
