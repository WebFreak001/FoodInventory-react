let React = require('react');
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ScannedItemRow from './ScannedItemRow';
import { Component } from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
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
        });
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
                />
            </View>
        );
    };

}
