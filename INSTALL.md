# For each fresh clone (to do when freshly downloading)

run `npx jetify` (to fix androidx incompatibility, need to do this on every new install)

then run normally using `react-native start` and `react-native run-android`

# Dependencies

Ran `npm install --save-dev jetifier` to allow running jetify in the project.

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

## react-native-vector-icons

Add `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"` to android/app/build.gradle
