import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
} from "react-native";
import colorDefaults from "../../theme/colorDefaults";
import LoadingScreen from "../LoadingScreen";
import AuthContext from "../../context/AuthContext";
import { auth } from "../../firebase/firebaseConfig";

export default function WelcomeScreen({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const { authUserId, setAuthUserId } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUserId(user.uid);
        setLoading(false);
        if (route.name === "WelcomeScreen") navigation.replace("Menu");
      } else {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <View style={styles.container}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode={"contain"}
          />

          <TouchableHighlight
            onPress={() => navigation.navigate("Sign In")}
            style={styles.buttonSignIn}
          >
            <View>
              <Text style={styles.buttonText}>Sign In</Text>
            </View>
          </TouchableHighlight>

          <Text style={styles.or}>Or</Text>

          <TouchableHighlight
            onPress={() => navigation.navigate("Sign Up")}
            style={styles.buttonSignUp}
          >
            <View>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorDefaults.backDropColor,
    alignItems: "center",
  },

  logo: {
    top: 100,
    minWidth: 100,
    minHeight: 100,
  },

  buttonSignIn: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    width: 380,
    height: 43,
    padding: 10,
    top: 250,
    alignItems: "center",
  },

  buttonSignUp: {
    borderRadius: 20,
    backgroundColor: colorDefaults.primary,
    width: 380,
    height: 43,
    padding: 10,
    top: 270,
    alignItems: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  or: {
    fontSize: 14,
    color: "#9F9F9F",
    top: 260,
  },
});
