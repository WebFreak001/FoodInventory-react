import {createStackNavigator, createAppContainer} from 'react-navigation';

import HomeView from './views/HomeView';
import ScannerView from './views/ScannerView';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeView},
  Scanner: {screen: ScannerView},
});

const App = createAppContainer(MainNavigator);

export default App;