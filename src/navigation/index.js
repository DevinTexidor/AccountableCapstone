import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import stacks
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn" headerMode="none">
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="App" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}