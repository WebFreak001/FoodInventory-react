let React = require('react');
import { View, Text, StyleSheet, Image } from 'react-native';

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

const ScannedItemRow = ({ name, image, expiryDate}) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {name}
                </Text>
                <Text>
                    {relativeDate(expiryDate)}
                </Text>
            </View>

        </View>
    )
};

export default ScannedItemRow;