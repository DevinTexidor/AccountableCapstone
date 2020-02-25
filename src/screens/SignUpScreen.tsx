import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput
} from "react-native";
import { TextField } from "react-native-material-textfield";
import * as firebase from "../firebase";
import { Config } from "../config";
import { User } from "../types";
const { colors } = Config;

type SignUpState = {
  err: boolean;
  email: string;
  password: string;
};

type SignUpProps = {
  navigation: any;
};

class SignUpScreen extends Component<SignUpProps, SignUpState> {
  constructor(props) {
    super(props);
    this.state = { err: null, email: "test@gmail.com", password: "password" };
    this.signUpAsync = this.signUpAsync.bind(this);
  }

  signUpAsync = async () => {
    // deref
    const { navigate } = this.props.navigation;
    const { email, password, err } = this.state;

    try {
      // Sign up user
      const { user } = await firebase.signUp(email, password);
      const { uid } = user;

      // Sign in user
      const signIn = firebase.signIn(email, password);

      // create user obj
      const User: User = {
        uid,
        email,
        firstName: "John",
        lastName: "Doe"
      };

      // Initialize user in database
      const createUser = firebase.createUser(User);

      // Store user globally in Redux
      // storeUser(User);

      // wait for async signIn and createUser to finish
      await Promise.all([signIn, createUser]);

      // navigate to MainStack upon success
      navigate("Main");
    } catch (err) {
      // log error
      alert(err);

      // set error in state
      this.setState({ err });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Accountable</Text>
        <View style={styles.inputsContainer}>
          <TextField label="Email" />
          <TextField label="Password" />
          <TextField label="Confirm Password" />
          <TouchableOpacity onPress={this.signUpAsync}>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Config.padding,
    justifyContent: "space-around",
    paddingTop: Config.height * 0.14,
    paddingBottom: Config.height * 0.2,
    backgroundColor: colors.background
  },
  logo: {
    fontSize: 50,
    alignSelf: "center",
    color: colors.primary
  },
  inputsContainer: {
    padding: Config.padding,
    backgroundColor: "#fff",
    borderRadius: Config.roundness
  },
  loginContainer: {
    height: Config.height * 0.07,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: Config.roundness,
    marginVertical: Config.height * 0.03
  },
  loginText: {
    color: "#fff",
    fontSize: 23
  }
});

export default SignUpScreen;