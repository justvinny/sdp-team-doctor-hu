import React from "react";
import { BottomSheet, ListItem } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function BottomSheetNav({ visible, setVisible, toggleOverlay }) {
  const list = [
    {
      title: "Change Profile Picture",
      onPress: () => {
        toggleOverlay();
        setVisible(false);
      },
    },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setVisible(false),
    },
  ];

  return (
    <SafeAreaProvider>
      <BottomSheet
        isVisible={visible}
        containerStyle={{
          backgroundColor: "rgba(0.5, 0.25, 0, 0.2",
        }}
      >
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </SafeAreaProvider>
  );
}
