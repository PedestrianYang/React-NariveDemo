/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  View
} from 'react-native';

var FirstPage = require('./FirstPage');
var SecondPage = require('./SecondPage');

var NavigationBarRouteMapper = {
  LeftButton: function(route, navigator, index, navState){
    switch(route.id)
    {
      case 'FirstPage':
      return (
      <TouchableOpacity

        style={styles.navBarLeftButton}>
        <Image style={styles.navBarLeftButtonIcon} source={require('./img/HomeScan.png')}/>
      </TouchableOpacity>
    );
      default:
      return (
      <TouchableOpacity
        onPress={() => {navigator.pop();}}
        style={styles.navBarLeftButton}>
        <Image style={{marginTop: 10,}} source={require('./img/category_nav_back.png')}/>
      </TouchableOpacity>
    );
    }
  },

  RightButton: function(route, navigator, index, navState){
    switch(route.id)
    {
      case 'FirstPage':
      return (
      <TouchableOpacity
        style={styles.navBarRightButton}>
        <Image style={styles.navBarRightButtonIcon} source={require('./img/HomeMessage_normal.png')}/>
      </TouchableOpacity>
    );
      case 'SecondPage':
      return null;
    }
    
  },

  Title: function(route, navigator, index, navState){
    switch(route.id)
    {
      case 'FirstPage':
      return (
      <View style={styles.navBarTitleView}>
      <TouchableOpacity onPress={() => navigator.push({id: 'SecondPage',name: '搜索商品', component: SecondPage})}>
      <View style={styles.navBarIconTitle}>
      <Image source={require('./img/Home_navigation_search.png')}/>
      <Text >搜索商品</Text>
      </View>
      </TouchableOpacity>
      </View>
    );
      default:
      return (
      <Text style={styles.navTitle}>{route.name}</Text>
      );
    }
    
  },
};

class NavigatorTestDemo extends Component {
  renderScene(route, navigator)
  {
    return <route.component navigator={navigator} route={route} navBarStyle={this} />;
  }
 
    componentWillUnmount(){  
       this._listeners && this._listeners.forEach(listener => listener.remove());
    }


changebar(event) {
if (event.route.id === 'FirstPage') {
  this.setState({
      style: styles.redNavBar,
      stautsStyle: 'light-content',
    });
  }else{
    this.setState({
      style: styles.whiteNavBar,
      stautsStyle: 'default',
    });
  }
}

componentDidMount()
{
  //componentDidMount使用this.refs.navigator，需要在Navigator配置中加入ref='navigator'
  this._setNavigatorRef(this.refs.navigator);
}

//navigator监听放置在componentDidMount中只调用一次，如果放置在ref中则会进入一次界面调用一次
_setNavigatorRef(navigator){
    if (navigator !== this._navigator) {
      this._navigator = navigator;
      console.log('=============');
      if (navigator) {
        var thiz = this;
        callback=(event)=>{
          var routeID = JSON.stringify(event.data.route.id);
          console.log('+++++++++++++++');
          if (routeID === '"FirstPage"') {
            this.setState({
              style: styles.redNavBar,
              stautsStyle: 'light-content',
            });
          }else{
            this.setState({
              style: styles.whiteNavBar,
              stautsStyle: 'default',
            });
          }
        }

        // Observe focus change events from the owner.
        this._listeners = [
          navigator.navigationContext.addListener('willfocus', callback),
          // navigator.navigationContext.addListener('didfocus', callback.bind(this)),
        ];
      }
    }
  }

constructor(props){
    super(props);
    this.state={
      style: styles.redNavBar,
      stautsStyle: 'light-content',
    };
  }

  render() {

    return (
      <View style={styles.bgView}>
      <StatusBar barStyle={this.state.stautsStyle}/>
      <Navigator 
      ref='navigator'
      initialRoute={{name:'FirstPage', index: 0, id: 'FirstPage',component: FirstPage}}
      renderScene={this.renderScene.bind(this)}
      navigationBar={
        <Navigator.NavigationBar 
            routeMapper={NavigationBarRouteMapper}
            style={this.state.style}
      />
    }
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bgView: {
    flex: 1,
  },
  redNavBar: {
    backgroundColor: '#b5082e',
    shadowOpacity: 1,
  },
  whiteNavBar: {
    backgroundColor: 'white',
    shadowOpacity: 1,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarLeftButtonIcon: {
    marginTop: 6,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarRightButtonIcon: {
    marginTop: 5,
  },
  navBarTitleView: {
    alignSelf: 'stretch',
    flex: 1,
    borderRadius: 3,
    marginTop: 5,
    marginBottom:8,
    marginRight: 50,
    marginLeft: 50,
    backgroundColor: 'white',
    opacity: 0.7,
  },
  navBarIconTitle: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  navTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

AppRegistry.registerComponent('NavigatorTestDemo', () => NavigatorTestDemo);
