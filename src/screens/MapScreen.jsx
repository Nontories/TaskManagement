import React, { useState, useEffect } from "react";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute, useNavigation } from "@react-navigation/native";
import { PermissionsAndroid } from "react-native";
import { selectTask } from "../redux/selector/selector";
import { useSelector } from "react-redux";
import useManageData from "../utils/useManageData";
import Header from "../components/Header";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function MapScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const taskList = useSelector(selectTask);
  const { updateTask, deleteTask, readTasks } = useManageData();

  const [task, setTask] = useState(null);
  const defaultLocation = { latitude: 10.8231, longitude: 106.6297 }; // Default Ho Chi Minh City coordinates

  const [location, setLocation] = useState(
    route?.params?.task?.location || defaultLocation
  );
  const [region, setRegion] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [latitude, setLatitude] = useState(location.latitude.toString());
  const [longitude, setLongitude] = useState(location.longitude.toString());

  useEffect(() => {
    if (route?.params?.task?.location?.latitude) {
      setLocation(route?.params?.task?.location);
      setLatitude(route?.params?.task?.location.latitude.toString());
      setLongitude(route?.params?.task?.location.longitude.toString());
    }
    setTask(route?.params?.task);
  }, [route?.params?.task]);

  useEffect(() => {
    if (location) {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  const handleSaveLocation = async () => {
    if (!latitude || !longitude) {
      Alert.alert("Error", "Please enter valid latitude and longitude.");
      return;
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert("Error", "Invalid latitude or longitude values.");
      return;
    }

    const updatedTask = {
      ...task,
      location: {
        latitude: lat,
        longitude: lng,
      },
    };

    const index = taskList.findIndex((item) => item.id === task.id);
    const updatedTaskList = [...taskList];
    updatedTaskList[index] = updatedTask;
    await updateTask(taskList, task.id, updatedTask);
    Alert.alert("Success", `Location saved for ${task.name}: ${lat}, ${lng}`);
    navigation.goBack(); // Navigate back after saving
  };

  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setLocation(coordinate);

    setLatitude(coordinate.latitude.toString());
    setLongitude(coordinate.longitude.toString());
    setRegion({
      ...region,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  };

  const handleReplace = () => {
    const coordinate = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    if (isNaN(coordinate.latitude) || isNaN(coordinate.longitude)) {
      Alert.alert("Error", "Invalid latitude or longitude values.");
      return;
    }

    // Update the location and region
    setLocation(coordinate);
    setRegion({
      ...region,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });

    console.log(coordinate); // Optional: For debugging purposes
  };

  // Function to get the current location
  const getCurrentLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message: "We need your location to show you on the map",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            setLatitude(latitude.toString());
            setLongitude(longitude.toString());
            setRegion({
              ...region,
              latitude,
              longitude,
            });
          },
          (error) => {
            Alert.alert("Error", "Unable to fetch current location.");
            console.error(error);
          }
        );
      } else {
        Alert.alert(
          "Permission Denied",
          "We need location permission to fetch your current location."
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Map"} />

      {/* Input for Latitude */}

      <MapView
        style={styles.map}
        region={region}
        onPress={handleMapPress} // Set the location on map press
      >
        {location && (
          <Marker
            coordinate={location}
            title="Marked Location"
            description="This is your marked location"
          />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Latitude"
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Longitude"
          keyboardType="numeric"
          value={longitude}
          onChangeText={setLongitude}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSaveLocation}
        >
          <Text style={styles.buttonText}>Save Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchButton} onPress={handleReplace}>
          <Text style={styles.buttonText}>To this location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  map: {
    position: "relative",
    width: WIDTH,
    height: "100%",
  },
  input: {
    width: "40%",
    height: 40,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 16,
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#2CAD5E",
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    width: "100%",
    top: HEIGHT * 0.08,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  button: {
    width: "80%",
    padding: 12,
    backgroundColor: "#2CAD5E",
    borderRadius: 12,
  },
});
