let React = require('react');
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';

import HomeView from './views/HomeView';
import FridgeView from './views/FridgeView';
import ScannerView from './views/ScannerView';
import CreateProductScreen from './views/CreateProductScreen';

import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AddExistingScreen from './views/AddExistingScreen';

// @ts-ignore
const config = require("./config.json");

// https://material.io/tools/color/#!/?view.left=1&amp;view.right=0&view.right=0&primary.color=651FFF

const MainStack = createStackNavigator({
  Home: { screen: HomeView },
  Fridge: {
    screen: FridgeView,
    path: 'Fridge/:fridge'
  },
  Scanner: { screen: ScannerView }
});



const CreateProductStack = createBottomTabNavigator({
  NameProduct: { screen: CreateProductScreen }
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
        return (<IconCommunity name="rocket" size={24} color={tintColor} />);
      },
    }),
    tabBarOptions: {
      activeTintColor: config.colors.primary,
      inactiveTintColor: 'gray',
    },
  });

const RootStack = createStackNavigator({
  Main: { screen: MainStack },
  AddExisting: { screen: AddExistingScreen },
  // StoreProduct: { screen: StoreProductScreen },
  CreateProduct: { screen: CreateProductStack },
}, {
    mode: "modal",
    headerMode: "none"
  });

const App = createAppContainer(RootStack);

export default App;