import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import DetailInfor from "./DetailTabScreen/DetailInfor";
import DetailImage from "./DetailTabScreen/DetailImage";
import DetailNote from "./DetailTabScreen/DetailNote";
import { selectTask } from "../redux/selector/selector";
import { useSelector } from "react-redux";
import useManageData from "../utils/useManageData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export default function DetailScreen({ route }) {
  const taskList = useSelector(selectTask);
  const navigation = useNavigation();
  const { saveTasks, deleteTask, readTasks } = useManageData();
  const [task, setTask] = useState(route?.params?.task);

  useEffect(() => {
    const targetTask = taskList.find(
      (item) => item.id === route?.params?.task?.id
    );
    if (targetTask) {
      setTask(targetTask);
    }
  }, [taskList, route?.params?.task]);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "infor", title: "Infor" },
    { key: "images", title: "Images" },
    // { key: "note", title: "Note" },
  ]);

  const renderScene = SceneMap({
    infor: () => FirstRoute({ task: task }),
    images: () => SecondRoute({ task: task }),
    // note: () => ThirdRoute({ task: task }),
  });

  const updateTaskImages = (newImages) => {
    setTask((prevTask) => {
      const uniqueImages = Array.from(new Set([...newImages]));

      const updatedTask = {
        ...prevTask,
        images: uniqueImages,
      };

      const index = taskList.findIndex((item) => item.id === prevTask.id);
      const updatedTaskList = [...taskList];
      updatedTaskList[index] = updatedTask;
      saveTasks(updatedTaskList);

      return { ...updatedTask };
    });
  };

  const handleDeleteTask = () => {
    Alert.alert(
      "Confirm Deletion",
      `Are you sure you want to delete ${task?.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteTask(taskList, task?.id), navigation.goBack();
          },
          style: "destructive",
        },
      ]
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicatorStyle}
      style={styles.tabBar}
      renderLabel={({ route, focused }) => (
        <Text
          style={[
            styles.tabLabel,
            { color: focused ? "#ffffff" : "#f5f5f5" }, // Color based on focus
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  const FirstRoute = ({ task }) => (
    <ScrollView
      style={[
        styles.scene,
        styles.paddingContainer,
        { backgroundColor: "#fff" },
      ]}
      nestedScrollEnabled={true}
    >
      <DetailInfor task={task} handleDeleteTask={handleDeleteTask} />
    </ScrollView>
  );

  const SecondRoute = ({ task }) => (
    <ScrollView
      style={[
        styles.scene,
        styles.paddingContainer,
        { backgroundColor: "#fff" },
      ]}
      nestedScrollEnabled={true}
    >
      <DetailImage task={task} updateTaskImages={updateTaskImages} />
    </ScrollView>
  );

  const ThirdRoute = ({ task }) => (
    <ScrollView
      style={[
        styles.scene,
        styles.paddingContainer,
        { backgroundColor: "#fff" },
      ]}
      nestedScrollEnabled={true}
    >
      <DetailNote task={task} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <Header title={"Detail"} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: WIDTH }}
      />
    </View>
  );
}

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

  tabViewContainer: {
    height: HEIGHT, // Set the height to fit the screen
    backgroundColor: "#fff",
  },

  // tabBar
  tabBar: {
    // width: WIDTH * 0.9,
    backgroundColor: "#2CAD5E",
    // borderRadius: 12,
    // margin: 10,
    // marginHorizontal: WIDTH * 0.05,
    // elevation: 0,
    // borderWidth: 1,
    // borderColor: "#E7E7E7",
    // justifyContent: "center",
  },
  indicatorStyle: {
    backgroundColor: "#2CAD5E",
    // height: "90%",
    // width: "32.5%",
    // marginVertical: "5%",
    // marginHorizontal: "0.833333333%",
    // borderRadius: 12,
  },
  tabLabel: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "600",
  },
});
