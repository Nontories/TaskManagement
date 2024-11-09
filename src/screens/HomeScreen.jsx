import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useSelector } from "react-redux";
import { selectTask } from "../redux/selector/selector";
import Header from "../components/Header";
import useManageData from "../utils/useManageData";
import TaskCard from "../components/TaskCard";
import AntDesignIcon from "../components/VectorIcons/AntDesignIcon";
import { useNavigation } from "@react-navigation/native";
import { formatDateTime } from "../utils/utils";

const HomeScreen = () => {
  const taskList = useSelector(selectTask);
  const navigation = useNavigation();
  const { readTasks } = useManageData();
  const [filteredTasks, setFilteredTasks] = useState(taskList);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadTaskData();
  }, []);

  useEffect(() => {
    // Filter tasks based on search query
    const filtered = taskList.filter((task) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        task.name.toLowerCase().includes(searchLower) ||
        formatDateTime(task.dueDate)?.toLowerCase().includes(searchLower)
      );
    });
    setFilteredTasks(filtered);
  }, [searchQuery, taskList]);

  const loadTaskData = async () => {
    await readTasks();
  };

  return (
    <>
      <Header title={"Home"} />
      <View style={styles.container}>
        {/* Search Bar */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name or Due Date"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {filteredTasks.length > 0 ? (
          <FlatList
            data={filteredTasks}
            renderItem={({ item }) => <TaskCard task={item} />}
            keyExtractor={(item) =>
              item.id?.toString() ||
              `${Math.random().toString(36).substr(2, 9)}`
            }
          />
        ) : (
          <Text style={styles.emptyText}>
            There are no tasks matching your search
          </Text>
        )}

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate("CreateScreen");
          }}
        >
          <AntDesignIcon name="plus" size={32} color={"white"} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    right: 50,
    padding: 12,
    borderRadius: 500,
    bottom: 50,
    backgroundColor: "#2CAD5E",
  },
  emptyText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 12,
  },
});

export default HomeScreen;
