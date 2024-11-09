import React from "react";
import {
  StyleSheet,
  Platform,
  View,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const HEIGHT = Dimensions.get("window").height;

const SafeAreaWrapper = ({ children }) => {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor={"#2CAD5E"} />

      {Platform.OS === "android" ? (
        <View style={styles.AndroidSafeArea}>{children}</View>
      ) : (
        <SafeAreaView
          style={{ ...styles.container }}
          edges={["top", "bottom", "left", "right"]}
        >
          {children}
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2CAD5E",
    paddingTop: HEIGHT * 0.06,
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default SafeAreaWrapper;
