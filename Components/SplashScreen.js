import React, { Component } from 'react';
import {
	View,
	StatusBar,
	StyleSheet,
	Image,
	ActivityIndicator
} from 'react-native';
import Spacing from './Spacing';

export class SplashScreen extends Component{
	render(){
		return (
			<View style={styles.splashScreen}>
				<Spacing />
				<Image source={require('./splashimg.png')}
					style={{width: 400, height: 400}} />
		      	<ActivityIndicator
					animating={true}
					style={{height: 80}}
					size="large"
					color="white"
				/>

			</View>);
   }
}

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
	alignItems: 'center'
  },
});

export default SplashScreen; 