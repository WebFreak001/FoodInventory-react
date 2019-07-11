let React = require('react');
import { Component } from 'react';
import { Button, View, Text, FlatList, StyleSheet } from 'react-native';
import ScannedItemRow from '../components/ScannedItemRow';
import ScannedItemList from '../components/ScannedItemsList';

const styles = StyleSheet.create({
  page1: {
      flex: 1,
      flexDirection: 'column'
  },
});

export default class SetupScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Setup Fridge',
  };

  render() {
    const { navigate } = this.props.navigation;
    var { code } = this.props.navigation.state.params;
    return (
      <View style={styles.page1}>
        <ScannedItemList
          dataProvider={() => Promise.resolve([{bsonID: "local1", name: "Product " + code}])}
        />
      </View>
    );
  }
}
