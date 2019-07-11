let React = require('react');
import { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ScannedItemList from '../components/ScannedItemsList';

import Icon from 'react-native-vector-icons/FontAwesome';

// @ts-ignore
const fridgeServer = require("../config.json");

// https://material.io/tools/color/#!/?view.left=1&amp;view.right=0&view.right=0&primary.color=651FFF

 const styles = StyleSheet.create({
  fab: {
    //Here is the trick
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    right: 16,
    bottom: 16,
    backgroundColor: '#651fff',
    color: 'white',
    borderRadius: 28,
    elevation: 5
 }
});

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeID: "5d1d9c85af6f44db0ac6dac0",
      api: {
        "label": "Fridge loading",
        "items": [],
        "bsonID": "5d1d9c85af6f44db0ac6dac0"
      }
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  async loadAPI() {
    var data = await fetch(config.serverURL + "/api/fridge/" + this.state.fridgeID, {
      method: "GET",
      headers: {
        "User-Agent": "FoodInventory-react v0.1.0"
      }
    });
    var ret = await data.json();
    this.setState({
      fridgeID: "5d1d9c85af6f44db0ac6dac0",
      api: ret
    });
    return ret;
  }

  async fetchItems() {
    var data = await this.loadAPI();
    return data.items;
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScannedItemList
          dataProvider={this.fetchItems.bind(this)}
        />
        <TouchableOpacity style={styles.fab} onPress={() => navigate('Scanner')}>
          <Icon name="barcode" size={24} color={styles.fab.color} />
        </TouchableOpacity>
      </View>
    );
  }
}
