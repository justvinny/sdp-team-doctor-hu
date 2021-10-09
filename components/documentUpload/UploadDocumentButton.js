import React, { useEffect, useState, useContext } from "react";
import { FAB, Overlay } from 'react-native-elements';
import UploadDocument from '../documentUpload/UploadDocument';
import colorDefaults from "../../theme/colorDefaults";


function UploadActionButton({visible, setDocumentVisible, toggleDocumentOverlay}){



    return (
            <FAB  placement="right" size="large" 
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