import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigation";
import * as firebase from "./src/firebase";

firebase.init();

class App extends React.Component {
  componentDidMount() {}

  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
