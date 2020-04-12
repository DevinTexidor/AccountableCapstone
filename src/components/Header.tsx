import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Layout, Colors } from "../config";
import * as firebase from "../firebase";

export interface HeaderProps {
  hideBack?: Boolean;
  chatHeader?: String;
}

function Header(props: HeaderProps) {
  const navigation = useNavigation();
  const { hideBack, chatHeader } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {chatHeader ? chatHeader : "Accountable"}
      </Text>
      {!hideBack && (
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={35}
              color={Colors.headerText}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Layout.headerHeight,
    backgroundColor: Colors.primary,
    paddingTop: Layout.statusBarHeight,
    paddingBottom: 5,
    justifyContent: "flex-end",
  },
  headerText: {
    fontFamily: "Roboto-Bold",
    color: Colors.headerText,
    fontSize: 30,
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    top: Layout.statusBarHeight,
    left: 5,
  },
});

export default Header;
