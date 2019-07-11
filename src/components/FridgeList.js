let React = require('react');
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { Component } from 'react';
import Snackbar from 'react-native-snackbar';
import FridgeItem from './FridgeItem';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#eee'
	},
	missing: {
		textAlign: "center",
		paddingTop: 64,
		paddingBottom: 64,
		color: "rgba(0, 0, 0, 0.6)"
	},
});

/**
 * @typedef {Object} FridgeListProperties
 * @property {() => Promise<import('./FridgeItem').FridgeItemProperties[]>} dataProvider
 * @property {boolean} [reloadable]
 */

export default class FridgeList extends Component {
	/**
	 * @param {FridgeListProperties} props 
	 */
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			items: []
		};
	}

	componentDidMount() {
		this.refreshItems();
	}

	refreshItems() {
		this.setState({
			loading: true,
			items: this.state.items
		});
		this.props.dataProvider().then(items => {
			this.setState({
				loading: false,
				items: items
			});
		}, err => {
			this.setState({
				loading: false,
				items: this.state.items
			});
			Snackbar.show({
				title: "Failed to load fridges",
				color: "white",
				duration: Snackbar.LENGTH_LONG,
				action: {
					title: "RETRY",
					color: 'yellow',
					onPress: this.refreshItems.bind(this),
				},
			});
		});
	}

	render() {
		if (Array.isArray(this.state.items) && this.state.items.length > 0) {
			return (
				<View style={styles.container}>
					<FlatList
						data={this.state.items}
						refreshing={this.state.loading}
						onRefresh={this.props.reloadable !== false ? this.refreshItems.bind(this) : undefined}
						keyExtractor={item => item.bsonID}
						renderItem={({ item }) => <FridgeItem onItemPress={this.props.onItemPress} {...item}/>}
					/>
				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<Text style={styles.missing}>No fridges created yet</Text>
				</View>
			);
		}
	};

}
