import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";
import { Provider } from "react-redux";
import store from "./src/store/common";
import StackNavigation from "./src/routing/StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import SafeAreaWrapper from "./src/components/SafeAreaWapper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        {Platform.OS === "web" ? (
          <SafeAreaProvider>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </SafeAreaProvider>
        ) : (
          <SafeAreaWrapper>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </SafeAreaWrapper>
        )}
      </ToastProvider>
    </Provider>
  );
}
