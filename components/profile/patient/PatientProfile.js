import React, { useEffect, useLayoutEffect, useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from "react-native";
import colorDefaults from "../../../theme/colorDefaults";
import AddressTab from "./AddressTab";
import MedicalTab from "./MedicalTab";
import firestoreService from "../../../firebase/firestoreService";
import AuthContext from "../../../context/AuthContext";
import LoadingScreen from "../../../components/LoadingScreen";
import Patient from "../../../models/Patient";
import TabStyles from "../profilecomponents/TabStyles";
import { Tab, TabView } from "react-native-elements";
import GlobalProfileTab from "../profilecomponents/GlobalProfileTab";
import BottomSheetNav from "../profilecomponents/BottomSheetNav";
import { TouchableOpacity } from "react-native-gesture-handler";

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
  let profilePicture = user.picture;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Patient Profile",
    });
  }, []);

  !passedUser &&
    useEffect(() => {
      firestoreService.getUserById(authUserId).then((data) => {
        setUser(Patient.patientFirestoreFactory(data));
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
              <TouchableOpacity onPress={() => setSheetVisible(true)}>
                <Image style={styles.image} source={{ uri: profilePicture }} />
              </TouchableOpacity>
              <Text style={styles.name}>{user.getFullName()}</Text>
            </View>

            <BottomSheetNav
              visible={sheetVisible}
              setVisible={setSheetVisible}
              navigation={navigation}
            />

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
                title="address"
                titleStyle={TabStyles.tabText}
                style={[
                  index == 1 ? TabStyles.activeTab : TabStyles.inactiveTab,
                ]}
              />

              <Tab.Item
                title="medical"
                titleStyle={TabStyles.tabText}
                style={[
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
