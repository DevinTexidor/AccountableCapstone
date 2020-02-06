import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "./src/navigation";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

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
