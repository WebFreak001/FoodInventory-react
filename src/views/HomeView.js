let React = require('react');
import { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import FridgeList from '../components/FridgeList';
import AsyncStorage from '@react-native-community/async-storage';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Portal, Provider, Modal, TextInput, Button, Dialog } from 'react-native-paper';
import Snackbar from 'react-native-snackbar';

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

export default class HomeView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			settingUp: false,
			fridgeName: "",
			working: false
		};
	}

	static navigationOptions = {
		title: 'Home',
	};

	async fetchItems() {
		var fridges = [];
		try {
			var ret = await AsyncStorage.getItem("fridges");
			if (ret[0] == "[")
				fridges = JSON.parse(ret);
		} catch (e) {
		}
		return fridges;
	}

	openFridge(item) {
		const { navigate } = this.props.navigation;
		var focusSubscription = this.props.navigation.addListener('didFocus', () => {
			focusSubscription.remove();
			return this._leftFridge();
		});
		navigate("Fridge", { fridge: item.props.bsonID });
	}

	async _leftFridge() {
		var msg = this.props.navigation.getParam("msg", "");
		var src = this.props.navigation.getParam("src", "");
		this.props.navigation.setParams({ msg: "", src: "" });
		if (msg == "fridge404") {
			Snackbar.show({
				title: "This fridge doesn't exist anymore",
				color: "white",
				duration: Snackbar.LENGTH_LONG,
			});
			await this.removeFridge(src);
		}
	}

	setupFridge() {
		this.setState({
			settingUp: true,
			fridgeName: "",
			working: false
		});
	}

	_dismissDialog() {
		this.setState({
			settingUp: false,
			fridgeName: "",
			working: false
		});
	}

	async _doCreate() {
		var label = this.state.fridgeName;
		if (!label)
			label = "Unnamed Fridge";

		this.setState({
			settingUp: true,
			fridgeName: label,
			working: true
		});

		var itemsTask = this.fetchItems();
		try {
			var data = await fetch(config.serverURL + "/api/fridge", {
				method: "POST",
				headers: {
					"User-Agent": "FoodInventory-react v0.1.0",
					"Accept": "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					label: label
				})
			});
			if (!data.ok)
				throw new Error("Failed to create fridge");

			var json = await data.json();
			var fridge = {
				bsonID: json.bsonID,
				label: json.label
			};
			if (!fridge.bsonID || !fridge.label)
				throw new Error("Unexpected API response");
			var list = await itemsTask;
			list.push(fridge);

			await AsyncStorage.setItem("fridges", JSON.stringify(list));

			this._dismissDialog();

			this.fridgeList.refreshItems();
		} catch (e) {
			console.error(e);
			Snackbar.show({
				title: e.message || e.msg || "Failed to create Fridge",
				color: "white",
				duration: Snackbar.LENGTH_LONG,
			});
		}
	}

	async removeFridge(id) {
		var items = await this.fetchItems();
		var index = items.findIndex((e) => e.bsonID == id);
		if (index == -1)
			return false;

		items.splice(index, 1);
		await AsyncStorage.setItem("fridges", JSON.stringify(items));

		this.fridgeList.refreshItems();

		return true;
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flex: 1, flexDirection: 'column' }}>
				<Portal>
					<Dialog visible={this.state.settingUp} onDismiss={this._dismissDialog.bind(this)}>
						<Dialog.Title>Add Fridge</Dialog.Title>
						<Dialog.Content>
							<TextInput value={this.state.fridgeName} onChangeText={fridgeName => this.setState({ fridgeName })} label="Name your Fridge" />
						</Dialog.Content>
						<Dialog.Actions>
							<Button onPress={this._dismissDialog.bind(this)} disabled={this.state.working}>Cancel</Button>
							<Button onPress={this._doCreate.bind(this)} disabled={this.state.working}>OK</Button>
						</Dialog.Actions>
					</Dialog>
				</Portal>

				<FridgeList
					ref={ref => {
						this.fridgeList = ref;
					}}
					onItemPress={this.openFridge.bind(this)}
					dataProvider={this.fetchItems.bind(this)}
				/>
				<TouchableOpacity style={styles.fab} onPress={this.setupFridge.bind(this)}>
					<Icon name="add" size={24} color={styles.fab.color} accessibilityLabel="Add fridge" />
				</TouchableOpacity>
			</View>
		);
	}
}
