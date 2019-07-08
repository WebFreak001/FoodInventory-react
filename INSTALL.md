# For each run

run `npx jetify` (to fix androidx incompatibility, need to do this on every new install)

# Dependencies

## react-native-camera

Added react-native-camera as node dependency

Added `<uses-permission android:name="android.permission.CAMERA" />` to android/app/src/main/AndroidManifest.xml (to allow camera usage)

Added
```
android {
	...
	defaultConfig {
		...

		missingDimensionStrategy 'react-native-camera', 'general'
	}
}
```
to android/app/build.gradle (to fix dependency issues when starting)

## react-navigation

```
npm install --save react-navigation
npm install --save react-native-gesture-handler
npx jetify
```
