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
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AuthContext from "../../../context/AuthContext";
import firestoreService from "../../../firebase/firestoreService";
import Staff from "../../../models/Staff";
import AboutTab from "./AboutTab";
import { Tab, TabView } from "react-native-elements";
import TabStyles from "../profilecomponents/TabStyles";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";

export default function StaffProfile({ navigation, route }) {
  const [index, setIndex] = useState(0);
  const passedUser = route.params?.user;
  const { authUserId } = useContext(AuthContext);
  const [user, setUser] = useState(passedUser ? passedUser : {});
  const [loading, setLoading] = useState(passedUser ? false : true);

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
      return <></>;
    }

    return (
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView bounces="false" style={{ flex: 1 }}>
            <View style={styles.container}>
              <Image
                style={styles.image}
                source={require("../../../assets/icon.png")}
              />
              <Text style={styles.name}>{Staff.getFullName(user.name)}</Text>
            </View>

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
    );
  };

  return renderPage();
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colorDefaults.backDropColor,
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
