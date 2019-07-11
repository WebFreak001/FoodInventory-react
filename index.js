/**
 * @format
 */

let React = require('react');

import {AppRegistry} from 'react-native';
import App from './src/App';
// @ts-ignore
import {name as appName} from './app.json';
import { Provider as PaperProvider } from 'react-native-paper';

export default function Main() {
	return (
		<PaperProvider>
			<App />
		</PaperProvider>
	);
}

AppRegistry.registerComponent(appName, () => Main);
