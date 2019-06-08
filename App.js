import React, { Component } from "react";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import { Spinner } from "native-base";

import HomeScreen from "./screens/homeScreen";
import LoginScreen from "./screens/loginScreen";
import SignUpScreen from "./screens/signUpScreen";

import firebase from "react-native-firebase";

class IndexScreen extends Component {
  constructor() {
    super();
    this.unsubscriber = null;
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //todo when logged in
        this.props.navigation.navigate("Home");
      } else {
        //todo when not logged in
        this.props.navigation.navigate("Auth");
      }
    });
  }

  componentWillUnMount() {
    //killing the auth listener
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    return <Spinner color="blue" />;
  }
}

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Index: IndexScreen,
      Home: HomeScreen,
      Auth: AuthStack
    },
    {
      defaultNavigationOptions: {
        header: null
      }
    }
  )
);

export default AppContainer;
