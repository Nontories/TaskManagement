import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
// import RouteList from "./Routes";

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* {RouteList.map((route, index) => (
        <Stack.Screen
          key={index}
          name={route.name}
          component={route.component}
          options={route.options}
        />
      ))} */}
      <Stack.Screen
        name="Main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
