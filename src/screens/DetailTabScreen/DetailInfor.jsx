import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { formatDateTime } from "../../utils/utils";
import { useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const defaultIcon =
  "data:image/jpeg;base64,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";

const DetailInfor = ({ task, handleDeleteTask }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.detailContainer}>
      <View style={styles.imageContainer}>
        <View
          style={{
            padding: 4,
            borderWidth: 1,
            borderRadius: 12,
            borderColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Image
            source={{
              uri: (task?.images && task?.images[0]) || defaultIcon,
            }}
            style={styles.taskCardImg}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Task Name:</Text>
        <Text style={styles.textValue}>{task?.name}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Description:</Text>
        <Text style={styles.textValue}>{task?.description}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Status:</Text>
        <Text style={styles.textValue}>{task?.status}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Priority:</Text>
        <Text style={styles.textValue}>{task?.priority}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Start Date:</Text>
        <Text style={styles.textValue}>{formatDateTime(task?.startDate)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Deadline:</Text>
        <Text style={styles.textValue}>{formatDateTime(task?.dueDate)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Latitude:</Text>
        <Text style={styles.textValue}>{task?.location?.latitude}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Latitude:</Text>
        <Text style={styles.textValue}>{task?.location?.longitude}</Text>
      </View>
      <View style={styles.textContainer}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#2CAD5E" }}
          onPress={() => {
            navigation.navigate("MapScreen", { task: task });
            // navigation.navigate("MapScreen");
          }}
        >
          <Text style={styles.buttonText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#ffc107" }}
          onPress={() => {
            navigation.navigate("EditScreen", { task: task });
          }}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: "#dc3545" }}
          onPress={handleDeleteTask}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    gap: 8,
  },
  imageContainer: {
    height: HEIGHT * 0.2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  taskCardImg: {
    height: HEIGHT * 0.18,
    width: HEIGHT * 0.18,
    borderRadius: 8,
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textTitle: {
    width: "35%",
    fontWeight: "bold",
    fontSize: 18,
  },
  textValue: {
    width: "65%",
  },
  button: {
    width: "30%",
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  buttonText: {
    fontWeight: "700",
    color: "white",
    textAlign: "center",
  },
});

export default DetailInfor;
