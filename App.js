import React, { Component } from 'react';
import { Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class MyApp extends Component {
  constructor(props) {super(props);
    this.state = {
      torchOn: false
    };
  }

  barcodeReceived(e) {
    Alert.alert("Barcode value is " + JSON.stringify(e));
  }

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        trackingEnabled
        onGoogleVisionBarcodesDetected={this.barcodeReceived}
        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.EAN_13 | RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.EAN_8}
      />
    );
  }
}
