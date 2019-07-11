let React = require('react');
import { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ScannedItemList from '../components/ScannedItemsList';

import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

// @ts-ignore
const config = require("../config.json");

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
		backgroundColor: config.colors.primary,
		color: 'white',
		borderRadius: 28,
		elevation: 5
	}
});

export default class FridgeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api: {}
		};
	}

	static navigationOptions = {
		title: 'Fridge',
	};

	async loadAPI() {
		var data = await fetch(config.serverURL + "/api/fridge/" + this.state.fridgeID, {
			method: "GET",
			headers: {
				"User-Agent": "FoodInventory-react v0.1.0"
			}
		});
		if (!data.ok) {
			if (data.status == 404) {
				this.setupFridge();
				return;
			} else {
				throw new Error("Got invalid status code " + data.status + " when fetching fridge: " + await data.text());
			}
		}
		var ret = await data.json();
		this.setState({
			fridgeID: "5d1d9c85af6f44db0ac6dac0",
			api: ret
		});
		return ret;
	}

	async fetchItems() {
		var data = await this.loadAPI();
		if (!data)
			return null;
		return data.items;
	}

	setupFridge() {
		const { navigate } = this.props.navigation;
	}

	componentDidMount() {
		this.setState({
			fridgeID: this.props.navigation.getParam("fridge", "NO-ID")
		});
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<ScannedItemList
					dataProvider={this.fetchItems.bind(this)}
				/>
				<TouchableOpacity style={styles.fab} onPress={() => navigate('Scanner')}>
					<IconCommunity name="barcode-scan" size={24} color={styles.fab.color} accessibilityLabel="Scan product" />
				</TouchableOpacity>
			</View>
		);
	}
}
