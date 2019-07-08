let React = require('react');
import { Component } from 'react';
import { Button, View, Text } from 'react-native';
import ScannedItemRow from '../components/ScannedItemRow';

export default class AddExistingScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Add Product',
  };

  render() {
    const { navigate } = this.props.navigation;
    var { code } = this.props.navigation.state.params;
    return (
      <View>
        <ScannedItemRow name={"Product " + code}/>
      </View>
    );
  }
}
