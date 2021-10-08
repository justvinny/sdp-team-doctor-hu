import { FAB } from 'react-native-elements';

const UploadActionButton = () => {

    return (
            <FAB  placement="right" size="large" 
            icon={{
                name: "file-upload",
                size: 25,
                color: "white"
                }}
              onPress={() => console.log("hello")} 
            />
      );
};    


export default UploadActionButton;