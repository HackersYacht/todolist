import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  Spinner
} from "native-base";

import firebase from "react-native-firebase";

export default class LoginScreen extends Component {
  state = {
    email: "",
    password: "",
    loading: false,
    message: ""
  };

  login() {
    const { email, password } = this.state;
    //we start the spinner and clear any old error message
    this.setState({ loading: true, message: "" });

    //call the sign in function from firebase
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        //once we are logged in , we move to the home screen
        this.props.navgation.navigate("Home", { user });
      })
      .catch(err => {
        //if failure, stop the spinner and show the error message
        this.setState({ loading: false, message: err.message });
      });
  }

  render() {
    const { loading, message } = this.state;
    return (
      <Container>
        <Content
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
        >
          {loading ? <Spinner color="blue" /> : <Text>{message}</Text>}

          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input
                onChangeText={email => this.setState({ email })}
                autoFocus
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                onChangeText={password => this.setState({ password })}
                secureTextEntry
              />
            </Item>
          </Form>

          <Button
            block
            style={{ marginVertical: 20 }}
            onPress={() => this.login()}
          >
            <Text>Login</Text>
          </Button>

          <Text style={{ alignSelf: "center" }}>Or</Text>

          <Button
            block
            style={{ marginVertical: 10 }}
            onPress={() => this.props.navigation.navigate("SignUp")}
          >
            <Text>Create an account</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
