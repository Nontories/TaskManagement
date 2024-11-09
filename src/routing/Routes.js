import DetailScreen from "../screens/DetailScreen";
import EditScreen from "../screens/EditScreen";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";

import FeatherIcon from "../components/VectorIcons/Feather";
import FontistoIcon from "../components/VectorIcons/FontistoIcon";
import CreateScreen from "../screens/CreateScreen";

const RouteList = [
  {
    name: "HomeScreen",
    component: HomeScreen,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <FeatherIcon name="home" size={32} color={color} />
      ),
      // activeColor: "#75E00A",
      // inactiveColor: "#ffffff",
      headerShown: false,
    },
  },
  {
    name: "MapScreen",
    component: MapScreen,
    options: {
      tabBarIcon: ({ color, focused }) => (
        <FontistoIcon name="map" size={32} color={color} />
      ),
      headerShown: false,
    },
  },
  {
    name: "DetailScreen",
    component: DetailScreen,
    options: {
      tabBarButton: () => null,
    },
    // hiddenBottomTab: true,
  },
  {
    name: "EditScreen",
    component: EditScreen,
    options: {
      tabBarButton: () => null,
    },
    // hiddenBottomTab: true,
  },
  {
    name: "CreateScreen",
    component: CreateScreen,
    options: {
      tabBarButton: () => null,
    },
    // hiddenBottomTab: true,
  },
];

export default RouteList;
