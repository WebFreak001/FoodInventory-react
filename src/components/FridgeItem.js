let React = require('react');
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StyleProp, TextStyle } from 'react-native';
import { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		padding: 16
	},
	title: {
		fontSize: 16,
		color: '#000',
	},
});

/**
 * @typedef {Object} FridgeItemProperties
 * @property {string} bsonID
 * @property {string} label
 */

export default class FridgeItem extends Component {
	/**
	 * @param {FridgeItemProperties} props 
	 */
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<TouchableOpacity onPress={() => this.props.onItemPress(this)}>
				<View style={styles.container}>
					<Text style={styles.title}>
						{this.props.label}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
};