import React, { useEffect, useState, useContext } from "react";
import { FAB, Overlay , SpeedDial} from 'react-native-elements';

function UploadActionButton({visible, setDocumentVisible, toggleDocumentOverlay}){

    return (
            <FAB  placement="right" size="large" color="blue"
            icon={{
                name: "file-upload",
                size: 25,
                color: "white"
                }}
              onPress={() => 
                {
                toggleDocumentOverlay();
                setDocumentVisible(false);
                } 
              }/>
            
      );
};    


export default UploadActionButton;