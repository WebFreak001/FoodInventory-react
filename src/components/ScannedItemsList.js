let React = require('react');
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ScannedItemRow from './ScannedItemRow';
import { Component } from 'react';
import Snackbar from 'react-native-snackbar';

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
 * @typedef {Object} ScannedItemListProperties
 * @property {() => Promise<import('./ScannedItemRow').ScannedItemRowProperties[]>} dataProvider
 * @property {boolean} [reloadable]
 */

export default class ScannedItemList extends Component {
	/**
	 * @param {ScannedItemListProperties} props 
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

	async refreshItems() {
		this.setState({
			loading: true,
			items: this.state.items
		});
		try {
			var items = await this.props.dataProvider();
			if (items instanceof Error)
				throw items;
			this.setState({
				loading: false,
				items: items
			});
		}
		catch (err) {
			console.error(err);
			this.setState({
				loading: false,
				items: this.state.items
			});
			Snackbar.show({
				title: "Failed to load items",
				color: "white",
				duration: Snackbar.LENGTH_LONG,
				action: {
					title: "RETRY",
					color: 'yellow',
					onPress: this.refreshItems.bind(this),
				},
			});
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					data={this.state.items}
					refreshing={this.state.loading}
					onRefresh={this.props.reloadable !== false ? this.refreshItems.bind(this) : undefined}
					keyExtractor={item => item.bsonID}
					renderItem={({ item }) => <ScannedItemRow
						name={item.name}
						image={item.image}
						expiryDate={item.expiryDate}
					/>}
					ListEmptyComponent={<Text style={styles.missing}>No items scanned yet</Text>}
				/>
			</View>
		);
	};

}
