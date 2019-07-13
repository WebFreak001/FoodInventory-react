let React = require('react');
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StyleProp, TextStyle } from 'react-native';
import { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import { dateDiff, relativeDate } from '../utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
    },
    inner: {
        flex: 1,
        flexDirection: 'row',
    },
    title: {
        fontSize: 16,
        color: '#000',
    },
    container_text: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft:16,
        paddingRight:16,
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "rgba(0,0,0,0.13)",
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        width: 64,
        minHeight: 10,
        alignSelf: 'stretch',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    photo_image: {
        height: 64,
        width: 64,
    },
});

/**
 * @typedef {Object} ScannedItemRowProperties
 * @property {string} bsonID
 * @property {string} name
 * @property {string} [image]
 * @property {string} [expiryDate]
 */

export default class ScannedItemRow extends Component {
    /**
     * @param {ScannedItemRowProperties} props 
     */
    constructor(props) {
        super(props);
        this.state = {
            isExtended: false,
        }
    }

    _expandScannedItemRow = () => {
        this.setState({isExtended: true})
        Alert.alert(this.props.name + " clicked");
    }

    _renderImage() {
        if (!this.props.image)
            return null;
        return (<View style={styles.photo}><Image source={{ uri: this.props.image }} style={styles.photo_image} /></View>);
    }

    _renderExpiry() {
        if (!this.props.expiryDate)
            return null;
        /**
         * @type {StyleProp<TextStyle>}
         */
        var style = {};
        var d = dateDiff(new Date(this.props.expiryDate), new Date());
        if (d <= 1)
            style.fontWeight = "bold";
        return (<Text style={style}>
            {relativeDate(this.props.expiryDate, "Expired", "Expires")}
        </Text>);
    }
    
    render() {
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={this._expandScannedItemRow.bind(this)} style={styles.inner}>
                    {this._renderImage()}
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {this.props.name}
                        </Text>
                        {this._renderExpiry()}
                    </View>
                </TouchableNativeFeedback>            
            </View>
        );
    }
};