let React = require('react');
import { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import ScannedItemList from '../components/ScannedItemsList';
import FridgeAPI from '../FridgeAPI';

const styles = StyleSheet.create({
  page1: {
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    flex: 0.3,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  separator: {
    flexShrink: 0,
    textAlign: 'center',
    padding: 8
  },
  list: {
    flex: 3
  },
});

export default class AddExistingScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Add Product',
  };

  _storeAnother() {

  }

  async fetchConflicts() {
    var fridgeID = this.props.navigation.getParam("fridge", "NO-ID");
    var { code } = this.props.navigation.state.params;

    var fridge = await FridgeAPI.getFridge(fridgeID);
    if (fridge === undefined) {
      this._storeAnother();
      return;
    }

    var conflicts = fridge.items.filter(item => item.code == code);
    if (conflicts.length == 0) {
      this._storeAnother();
      return;
    } else {
      return conflicts;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    var { code } = this.props.navigation.state.params;
    return (
      <View style={styles.page1}>
        <Button style={styles.button} onPress={this._storeAnother.bind(this)}>Store Another</Button>
        <Text style={styles.separator}>- or use existing -</Text>
        <ScannedItemList
          style={styles.list}
          dataProvider={this.fetchConflicts.bind(this)}
        />
      </View>
    );
  }
}
