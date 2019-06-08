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
  Spinner,
  Header,
  Left,
  Icon,
  Body
} from "native-base";

import firebase from "react-native-firebase";

export default class SignUpScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    loading: false,
    message: ""
  };

  signUp() {
    const { email, password, name } = this.state;
    //we start the spinner and clear any old error message
    this.setState({ loading: true, message: "" });

    if (email !== "" && password !== "" && name !== "") {
      //call the signup in function from firebase
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          //once successfully signed up
          //update the user profile with the name
          firebase
            .auth()
            .currentUser.updateProfile({
              displayName: name
            })
            .then(() => {
              //after updating the profile
              this.props.navigation.navigate("Home");
            })
            .catch(err => {
              //failed to update the profile
              //move to home
              this.props.navigation.navigate("Home");
            });
        })
        .catch(err => {
          //if failure for sign up, stop the spinner and show the error message
          this.setState({ loading: false, message: err.message });
        });
    } else {
      this.setState({ loading: false, message: "fill in all fields" });
    }
  }

  render() {
    const { loading, message } = this.state;
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body />
        </Header>

        <Content
          contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 50 }}
        >
          {loading ? <Spinner color="blue" /> : <Text>{message}</Text>}

          <Form>
            <Item floatingLabel>
              <Label>Name</Label>
              <Input onChangeText={name => this.setState({ name })} autoFocus />
            </Item>

            <Item floatingLabel>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({ email })} />
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
            onPress={() => this.signUp()}
          >
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
