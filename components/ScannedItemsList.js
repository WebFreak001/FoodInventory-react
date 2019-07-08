let React = require('react');
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ScannedItemRow from './ScannedItemRow';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});


const ScannedItemView = ({ itemList }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={itemList}
                keyExtractor={item => item.bsonID}
                renderItem={({ item }) =><ScannedItemRow
                    name={item.name}
                    image={item.image}
                />}
            />
        </View>
    );
};

export default ScannedItemView;