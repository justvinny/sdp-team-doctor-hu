import React from "react";
import { render  } from "@testing-library/react-native";
import UploadDocumentController from "./UploadDocumentController/UploadDocumentController";
import ProgressBar from "./UploadDocumentController/ProgressBar";


describe('<UploadDocumentController />', () => {
    const tree = render(<UploadDocumentController />).toJSON();
    it('UploadDocumentController Component renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});
describe('<ProgressBar />', () => {
    const tree = render(<ProgressBar />).toJSON();
    it('ProgressBar Component renders correctly', () => {
        expect(tree).toMatchSnapshot();
    });
});