import React, { Component } from 'react';
import { Button } from 'react-native';

export default class ScannerView extends Component {
  constructor(props) {super(props);
    this.state = {
      torchOn: false
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    return (
      <Button title="hello"/>
    );
  }
}
