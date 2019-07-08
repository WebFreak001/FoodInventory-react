let React = require('react');
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import HomeView from './views/HomeView';
import ScannerView from './views/ScannerView';
import AddExistingScreen from './views/AddExistingScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

const MainStack = createStackNavigator({
  Home: { screen: HomeView },
  Scanner: { screen: ScannerView }
});

const AddProductStack = createBottomTabNavigator({
  AddExisting: { screen: AddExistingScreen }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      // let IconComponent = Ionicons;
      // let iconName;
      // if (routeName === 'Home') {
      //   iconName = `ios-information-circle${focused ? '' : '-outline'}`;
      //   // Sometimes we want to add badges to some icons. 
      //   // You can check the implementation below.
      //   IconComponent = HomeIconWithBadge; 
      // } else if (routeName === 'Settings') {
      //   iconName = `ios-options`;
      // }

      // You can return any component that you like here!
      return (<Icon name="rocket" size={30} color={tintColor} />);
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
});

const RootStack = createStackNavigator({
  Main: { screen: MainStack },
  AddProduct: { screen: AddProductStack }
}, {
  mode: "modal",
  headerMode: "none"
});

const App = createAppContainer(RootStack);

export default App;