let React = require('react');
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, StyleProp, TextStyle } from 'react-native';
import { Component } from 'react';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
    container: {
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
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
        marginLeft: 12,
        justifyContent: 'center',
    },
    description: {
        fontSize: 11,
        fontStyle: 'italic',
    },
    photo: {
        height: 64,
        width: 64,
        borderRadius: 5,
    },
});

function dateDiff(a, b) {
    return Math.round((a.getTime() - b.getTime()) / 1000 / 60 / 60 / 24);
  }

function relativeDate(d) {
    var dt = dateDiff(new Date(d), new Date());
    if (dt < -1)
      return "Expired " + (-dt) + " days ago";
    else if (dt == -1)
      return "Expires yesterday";
    else if (dt == 0)
      return "Expires today";
    else if (dt == 1)
      return "Expires tomorrow";
    if (dt > 1)
      return "Expires in " + dt + " days";
}

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
        return (<Image source={{ uri: this.props.image }} style={styles.photo} />);
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
            {relativeDate(this.props.expiryDate)}
        </Text>);
    }
    
    render() {
        return(
            <View style={styles.container}>
                <TouchableNativeFeedback onPress={this._expandScannedItemRow} style={styles.inner}>
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