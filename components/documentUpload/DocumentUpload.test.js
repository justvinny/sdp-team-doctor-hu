import React from "react";
import { render  } from "@testing-library/react-native";
import UploadDocument from "./UploadDocument";
import ProgressBar from "./ProgressBar";


describe('<UploadDocument />', () => {
    const tree = render(<UploadDocument />).toJSON();
    it('UploadDocument Component renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
describe('<ProgressBar />', () => {
    const tree = render(<ProgressBar />).toJSON();
    it('ProgressBar Component renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});