import { Component } from 'react';
import { Button } from 'react-native';

export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      torchOn: false
    };
  }

  static navigationOptions = {
    title: 'Home',
  };

  loadAPI() {
    this.setState({
      api: {
        "label": "Unnamed Fridge",
        "items": [
          {
            "fridge": "5d1d9c85af6f44db0ac6dac0",
            "product": "5d1d9d443fd9bb990c43d8b7",
            "code": "4388844298217",
            "name": "Ja! Streichgut aus Butter und Rapsöl gesalzen",
            "image": "https://static.openfoodfacts.org/images/products/438/884/429/8217/front_de.16.400.jpg",
            "storeDate": "2019-07-04T06:31:46.046Z",
            "lastUseDate": "2019-07-04T09:27:28.732Z",
            "expiryDate": "2019-07-07T06:31:46.045Z",
            "stored": 0.01000000000000001,
            "timesUsed": 2,
            "trashed": false,
            "bsonID": "5d1d9d523fd9bb990c43d8b8"
          },
          {
            "fridge": "5d1d9c85af6f44db0ac6dac0",
            "product": "5d1d9d6c3fd9bb990c43d8b9",
            "code": "4014500517087",
            "name": "Sahnejoghurt mild Macadamia & Vanille",
            "image": "https://static.openfoodfacts.org/images/products/401/450/051/7087/front_de.4.400.jpg",
            "storeDate": "2019-07-04T06:32:15.004Z",
            "lastUseDate": "2019-07-04T07:21:33.385Z",
            "expiryDate": "2019-07-09T06:32:15.004Z",
            "stored": 0.91,
            "timesUsed": 1,
            "trashed": false,
            "bsonID": "5d1d9d6f3fd9bb990c43d8ba"
          },
          {
            "fridge": "5d1d9c85af6f44db0ac6dac0",
            "product": "5d1d9de443a05f150d863e67",
            "code": "4014500503837",
            "name": "Sahne Joghurt mild Erdbeer Panna Cotta",
            "image": "https://static.openfoodfacts.org/images/products/401/450/050/3837/front_de.6.400.jpg",
            "storeDate": "2019-07-04T06:34:47.117Z",
            "lastUseDate": "2019-07-04T07:21:37.356Z",
            "expiryDate": "2019-07-09T06:34:47.117Z",
            "stored": 0.2,
            "timesUsed": 1,
            "trashed": false,
            "bsonID": "5d1d9e0743a05f150d863e68"
          }
        ],
        "bsonID": "5d1d9c85af6f44db0ac6dac0"
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button title="hello" onPress={() => navigate('Scanner')} />
    );
  }
}
