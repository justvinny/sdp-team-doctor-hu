import React from "react";
import { render } from "@testing-library/react-native";
import UploadProfilePictureController from "./UploadProfilePictureController";

describe("<UploadProfilePictureController />", () => {
  const tree = render(<UploadProfilePictureController />).toJSON();
  it("UploadProfilePictureController Component renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
});
