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

var ThirdPage = require('./ThirdPage');

class SecondPage extends Component{

	render(){
		return(
		<View style={styles.bgView}>
		<StatusBar barStyle={'default'}/>
		<TouchableOpacity onPress={()=>{this.props.navigator.push({name: '呵呵呵',id: 'thirdPage',component:ThirdPage})}}>
		<Text>{this.props.route.id}</Text>
		</TouchableOpacity>
		</View>

		);
	}
}

const styles = StyleSheet.create({
  bgView: {
  	marginTop: 64,
  },
  navBar: {
  	backgroundColor: 'white',
  	shadowOpacity: 1,
  },
});

module.exports = SecondPage;