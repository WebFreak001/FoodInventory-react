let React = require('react');
import { Component } from 'react';
import { Button, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ScannedItemList from '../components/ScannedItemsList';

import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import FridgeAPI from '../FridgeAPI';

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
		var fridgeID = this.props.navigation.getParam("fridge", "NO-ID");
		var ret = FridgeAPI.getFridge(fridgeID);
		if (ret === undefined) {
			this._fridgeNotFound(fridgeID);
			return;
		}
		this.setState({
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

	_fridgeNotFound(id) {
		const { navigate } = this.props.navigation;
		navigate("Home", { msg: "fridge404", src: id });
	}

	render() {
		const { navigate } = this.props.navigation;
		var fridgeID = this.props.navigation.getParam("fridge", "NO-ID");
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<ScannedItemList
					dataProvider={this.fetchItems.bind(this)}
				/>
				<TouchableOpacity style={styles.fab} onPress={() => navigate('Scanner', { fridge: fridgeID })}>
					<IconCommunity name="barcode-scan" size={24} color={styles.fab.color} accessibilityLabel="Scan product" />
				</TouchableOpacity>
			</View>
		);
	}
}
