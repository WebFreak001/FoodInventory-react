let React = require('react');
import { Component } from 'react';
import { Button, View, ScrollView } from 'react-native';
import ScannedItemList from '../components/ScannedItemsList';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fridgeServer: "http://127.0.0.1:3000",
      fridgeID: "5d1d9c85af6f44db0ac6dac0",
      api: {
        "label": "Fridge loading",
        "items": [],
        "bsonID": "5d1d9c85af6f44db0ac6dac0"
      }
    }
  }

  static navigationOptions = {
    title: 'Home',
  };

  componentDidMount() {
    this.loadAPI();
  }

  loadAPI() {
    fetch(this.state.fridgeServer + "/api/fridge/" + this.state.fridgeID).then(res => {
      console.log(res);
      res.json().then(json => {
        this.state.api = json;
        this.setState(this.state);
      });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Button title="Scan Item" onPress={() => navigate('Scanner')} />
        <ScrollView>
          <ScannedItemList
            itemList={this.state.api.items}
          />
        </ScrollView>
      </View>
    );
  }
}
