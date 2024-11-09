import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import AntDesignIcon from "../../components/VectorIcons/AntDesignIcon";

const WIDTH = Dimensions.get("window").width;

const DetailImage = ({ task, updateTaskImages }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    Alert.alert("Permission to access media library is required!");
    return null;
  }

  const addImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 0,
      });

      if (!result.cancelled) {
        const imageUris = result.assets?.map((asset) => asset.uri);
        if (imageUris && imageUris?.length > 0) {
          updateTaskImages([...(task.images || []), ...imageUris]);
        }
      }
    } catch (error) {
      console.error("Error selecting images: ", error);
    }
  };

  const handleDeleteImage = (imageUri) => {
    Alert.alert("Delete Image", "Are you sure you want to delete this image?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedImages = task.images.filter((img) => img !== imageUri);
          const deleteIndex = task.images.findIndex((img) => img !== imageUri);

          updateTaskImages(updatedImages);
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageList}>
        {task.images?.map((item, key) => (
          <View style={styles.taskCardImgBox} key={key}>
            <Image
              source={{ uri: item }}
              style={styles.taskCardImg}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteImage(item)}
            >
              <AntDesignIcon name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.taskCardImgBox} onPress={addImages}>
          <Image
            source={require("../../assets/plus.png")}
            style={{ ...styles.taskCardImg, width: "50%", height: "50%" }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingTop: 12,
  },
  imageList: {
    width: WIDTH,
    height: "100%",
    paddingHorizontal: 12,
    flexWrap: "wrap",
    flexDirection: "row",
    gap: 12,
  },
  taskCardImgBox: {
    position: "relative",
    width: WIDTH * 0.29,
    height: WIDTH * 0.29,
    padding: 0,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  taskCardImg: {
    height: "90%",
    width: "90%",
    borderRadius: 8,
  },
  deleteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 4,
    borderRadius: 500,
    borderTopRightRadius: 24,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default DetailImage;
