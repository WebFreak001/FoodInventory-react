let React = require('react');
import { Component } from 'react';
import { Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default class ScannerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchOn: false
    };
  }

  static navigationOptions = {
    title: 'Scanner',
  };

  /**
   * @param {{barcodes: import('react-native-camera/types').Barcode[]}} e 
   */
  barcodeReceived(e) {
    console.log("Barcode received");
    const { navigate } = this.props.navigation;
    console.log(navigate);

    var item = e.barcodes[0];

    navigate("AddExisting", {
      type: item.type,
      code: item.data
    });
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
        captureAudio={false}
        trackingEnabled
        onGoogleVisionBarcodesDetected={(e) => this.barcodeReceived(e)}
        // @ts-ignore
        googleVisionBarcodeType={RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.EAN_13 | RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.EAN_8}
      />
    );
  }
}
