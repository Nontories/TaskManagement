import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RouteList from "./Routes";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
      })}
      backBehavior="history"
    >
      {RouteList.map((item, index) => (
        <Tab.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;
