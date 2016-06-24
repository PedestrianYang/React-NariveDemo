import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  StatusBar,
  View
} from 'react-native';

class FirstPage extends Component{
	render(){
		return(
			<View style={styles.container}>
			<Text>{this.props.route.id}</Text>
			</View>
			);
	}
}

var styles = StyleSheet.create({
	container: {
		marginTop: 64,
	},
});

module.exports = FirstPage;