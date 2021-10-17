// import React in our code
import React, { } from "react";
// import all the components we are going to use
import { StyleSheet, View, Text } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import ProgressBar from "./ProgressBar";


// Upload documents/images to patient profile
function UploadDocumentView({
  toggleDocumentOverlay,
  patientName,
  file,
  setFile,
  download,
  showDownload,
  title,
  setTitle,
  progress,
  showProgress,
  pickDocument,
  imagePicker,
  checkTitleInput,
  onChangeText
}) {


  const renderPage = () => {
    return (
      <View style={styles.container}>
        {/* screen coniditon showing on status of loading document */}
        {progress ? (
          <View style={styles.container}>
            <Text>Won't be a second, just uploading your document!</Text>
            <Text>Please don't navigate from the upload screen.</Text>

            {/* progress bar component */}
            <ProgressBar> </ProgressBar>
          </View>
        ) : (
          <>
            <Text
              style={{ textAlign: "center", marginBottom: 20, fontSize: 20 }}
            >
              Upload Document for:
              <Text style={{ fontWeight: "bold" }}> {patientName}</Text>
            </Text>

            {/* Document title input*/}
            <Input
              placeholder="Document Title"
              leftIcon={{ type: "document", name: "label" }}
              // style={styles}
              value={title}
              onChangeText={(title) => setTitle(title)}
            />

            <Button
              title="Choose Image"
              icon={
                <Icon
                  name="camera"
                  type="font-awesome-5"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              onPress={imagePicker}
              buttonStyle={styles.globalButton}
            />

            <Button
              title="Choose Document"
              icon={
                <Icon
                  name="file-upload"
                  type="font-awesome-5"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              onPress={pickDocument}
              buttonStyle={styles.globalButton}
            />

            {/* document attached and can be uploaded only when a document has been attached */}
            {download ? (
              <View style={styles.container}>
                <Text>Document attached successfully!</Text>
                <Text>Click Upload Document to continue.</Text>

                <Button
                  title="Upload Document"
                  icon={
                    <Icon
                      name="upload"
                      type="font-awesome-5"
                      size={20}
                      color="white"
                      style={{ marginRight: 10 }}
                    />
                  }
                  onPress={checkTitleInput}
                  buttonStyle={styles.uploadButton}
                />
              </View>
            ) : (
              <></>
            )}

            {/* cancel button */}
            <Button
              title="Cancel"
              icon={
                <Icon
                  name="times"
                  type="font-awesome-5"
                  size={20}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              onPress={toggleDocumentOverlay}
              buttonStyle={styles.removeButton}
            />
          </>
        )}
      </View>
    );
  };

  return renderPage();
}

export default UploadDocumentView;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 15,
  },
  globalButton: {
    borderRadius: 10,
    marginTop: 30,
  },
  removeButton: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "red",
  },
  uploadButton: {
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "green",
  },
});
