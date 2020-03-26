import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppContainer from "./src/navigation";
import * as firebase from "./src/firebase";
import Reducers from "./src/redux/reducers";

firebase.init();

class App extends React.Component {
  state = {
    isReady: false
  };

  /**
   * Cache all fonts and images before rendering application
   */
  async _cacheResourcesAsync() {
    const fonts = Font.loadAsync({
      "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf")
    });

    return Promise.all([fonts]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={createStore(Reducers)}>
        <AppContainer />
      </Provider>
    );
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
