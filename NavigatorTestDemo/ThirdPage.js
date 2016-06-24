import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  View
} from 'react-native';

class ThirdPage extends Component{

	render(){
		return(
		<View style={styles.bgView}>
		<StatusBar barStyle={'default'}/>
		<Text>{this.props.route.name}</Text>
		</View>
		);
	}
}

const styles = StyleSheet.create({
  bgView: {
  	marginTop: 64,
  },
});

module.exports = ThirdPage;