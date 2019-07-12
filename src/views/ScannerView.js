let React = require('react');
import { Component } from 'react';
import { Alert } from 'react-native';

import { RNCamera } from 'react-native-camera';
import FridgeAPI from '../FridgeAPI';

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

  async existsBarcode(code) {
    var fridgeID = this.props.navigation.getParam("fridge", "NO-ID");
    var fridge = await FridgeAPI.getFridge(fridgeID);
    if (fridge === undefined)
      return false;

    for (var i = 0; i < fridge.items.length; i++) {
      if (fridge.items[i].code == code) {
        return true;
      }
    }
    return false;
  }

  /**
   * @param {{barcodes: import('react-native-camera/types').Barcode[]}} e 
   */
  async barcodeReceived(e) {
    var fridgeID = this.props.navigation.getParam("fridge", "NO-ID");
    const { navigate } = this.props.navigation;
    this.camera.pausePreview();
    var item = e.barcodes[0];

    var exists = await this.existsBarcode(item.data);
    if (exists) {
      navigate("AddExisting", {
        fridge: fridgeID,
        type: item.type,
        code: item.data
      });
    } else {
      var product = await FridgeAPI.scan(item.data);
      if (!product) {
        navigate("CreateProduct", {
          fridge: fridgeID,
          type: item.type,
          code: item.data
        });
      } else {
        navigate("StoreProduct", {
          fridge: fridgeID,
          type: item.type,
          code: item.data
        });
      }
    }
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
