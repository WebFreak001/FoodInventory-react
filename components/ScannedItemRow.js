let React = require('react');
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Component } from 'react';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft:16,
        marginRight:16,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
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
      return "Expired: " + (-dt) + " days ago";
    else if (dt == -1)
      return "Expires: yesterday";
    else if (dt == 0)
      return "Expires: today";
    else if (dt == 1)
      return "Expires: tomorrow";
    if (dt > 1)
      return "Expires in " + dt + " days";
}

export default class ScannedItemRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExtended: false,
            name: props.name,
            image: props.image,
            expiryDate: props.expiryDate,
        }
    }

    _expandScannedItemRow = () => {
        this.setState({isExtended: true})
        Alert.alert(this.state.name + " clicked");
    }

    _renderImage() {
        if (!this.props.image)
            return null;
        return (<Image source={{ uri: this.state.image }} style={styles.photo} />);
    }

    _renderExpiry() {
        if (!this.props.expiryDate)
            return null;
        return (<Text>
            {relativeDate(this.state.expiryDate)}
        </Text>);
    }
    
    render() {
        return(
            <TouchableOpacity onPress={this._expandScannedItemRow}>
                <View style={styles.container}>
                    {this._renderImage()}
                    <View style={styles.container_text}>
                        <Text style={styles.title}>
                            {this.state.name}
                        </Text>
                        {this._renderExpiry()}
                    </View>
                </View>
            </TouchableOpacity>            
        );
    }
};