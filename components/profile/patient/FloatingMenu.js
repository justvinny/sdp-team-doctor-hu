import React from "react";
import colorDefaults from "../../../theme/colorDefaults";
import { SpeedDial } from "react-native-elements";

const FloatingMenu = ({ open, setOpen, openComments }) => {
  return (
    <SpeedDial
      isOpen={open}
      icon={{ name: "menu", color: "#fff" }}
      openIcon={{ name: "close", color: "#fff" }}
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      color={colorDefaults.primary}
      overlayColor="rgba(0,0,0,0)"
    >
      <SpeedDial.Action
        icon={{ name: "comment", color: "#fff" }}
        title="View Comments"
        onPress={openComments}
        color={colorDefaults.primary}
      />
      <SpeedDial.Action
        icon={{ name: "image", color: "#fff" }}
        title="View Results"
        onPress={() => console.log("Delete Something")}
        color={colorDefaults.primary}
      />
    </SpeedDial>
  );
};

export default FloatingMenu;
