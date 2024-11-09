import React, { useState } from "react";
import {
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Dropdown component
import DateTimePicker from "@react-native-community/datetimepicker"; // Datepicker component
import moment from "moment"; // For date formatting
import { selectTask } from "../redux/selector/selector";
import { useSelector } from "react-redux";
import useManageData from "../utils/useManageData";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const CreateScreen = () => {
  const taskList = useSelector(selectTask);
  const navigation = useNavigation();
  const { createTask, updateTask, deleteTask, readTasks, setDedaultTasks } =
    useManageData();

  const [updatedTask, setUpdatedTask] = useState({
    name: "New Task",
    description: "New task description",
    status: "Pending",
    priority: "Low",
    startDate: moment().toISOString(), // Current date and time
    dueDate: moment().add(1, "days").toISOString(), // Next day
  });

  useFocusEffect(
    React.useCallback(() => {
      setUpdatedTask({
        name: "New Task",
        description: "New task description",
        status: "Pending",
        priority: "Low",
        startDate: moment().toISOString(), // Current date and time
        dueDate: moment().add(1, "days").toISOString(), // Next day
      });
    }, [])
  );

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showDueTimePicker, setShowDueTimePicker] = useState(false);

  // Function to handle input change
  const handleInputChange = (field, value) => {
    setUpdatedTask((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Function to handle date/time change
  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || updatedTask[type];
    if (event.type === "set") {
      setUpdatedTask((prevState) => ({
        ...prevState,
        [type]: moment(currentDate).toISOString(),
      }));
    }
    // Close the picker after selection
    if (type === "startDate") {
      setShowStartDatePicker(false);
    } else if (type === "startTime") {
      setShowStartTimePicker(false);
    } else if (type === "dueDate") {
      setShowDueDatePicker(false);
    } else if (type === "dueTime") {
      setShowDueTimePicker(false);
    }
  };

  const handleSave = () => {
    setUpdatedTask((prevTask) => {
      const updatedTask = {
        ...prevTask,
        startDate: prevTask.startDate
          ? moment(prevTask.startDate).format("YYYY-MM-DD") +
            "T" +
            moment(prevTask.startTime).format("HH:mm:ss")
          : prevTask.startDate,
        dueDate: prevTask.dueDate
          ? moment(prevTask.dueDate).format("YYYY-MM-DD") +
            "T" +
            moment(prevTask.dueTime).format("HH:mm:ss")
          : prevTask.dueDate,
      };

      createTask(taskList, updatedTask);
      return { ...updatedTask };
    });
    navigation.goBack();
  };

  return (
    <>
      <Header title={"Create"} />
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Task Name</Text>
        <TextInput
          style={styles.inputField}
          value={updatedTask?.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.inputField}
          value={updatedTask?.description}
          onChangeText={(text) => handleInputChange("description", text)}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={updatedTask?.status}
            onValueChange={(itemValue) =>
              handleInputChange("status", itemValue)
            }
            style={styles.picker}
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Complete" value="Complete" />
            <Picker.Item label="Cancel" value="Cancel" />
          </Picker>
        </View>

        <Text style={styles.label}>Priority</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={updatedTask?.priority}
            onValueChange={(itemValue) =>
              handleInputChange("priority", itemValue)
            }
            style={styles.picker}
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </View>

        <Text style={styles.label}>Start Date</Text>
        <TouchableOpacity
          style={{ ...styles.inputField, paddingVertical: 12 }}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Text>
            {updatedTask?.startDate
              ? moment(updatedTask?.startDate).format("YYYY-MM-DD")
              : ""}
          </Text>
        </TouchableOpacity>
        {showStartDatePicker && (
          <DateTimePicker
            value={new Date(updatedTask.startDate)}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "startDate")
            }
          />
        )}

        <Text style={styles.label}>Start Time</Text>
        <TouchableOpacity
          style={{ ...styles.inputField, paddingVertical: 12 }}
          onPress={() => setShowStartTimePicker(true)}
        >
          <Text>
            {updatedTask?.startDate
              ? moment(updatedTask?.startDate).format("HH:mm")
              : ""}
          </Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={new Date(updatedTask.startDate)}
            mode="time"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "startTime")
            }
          />
        )}

        {/* Due Date Picker */}
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity
          style={{ ...styles.inputField, paddingVertical: 12 }}
          onPress={() => setShowDueDatePicker(true)}
        >
          <Text>
            {updatedTask?.dueDate
              ? moment(updatedTask?.dueDate).format("YYYY-MM-DD")
              : ""}
          </Text>
        </TouchableOpacity>
        {showDueDatePicker && (
          <DateTimePicker
            value={new Date(updatedTask.dueDate)}
            mode="date"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "dueDate")
            }
          />
        )}

        <Text style={styles.label}>Due Time</Text>
        <TouchableOpacity
          style={{ ...styles.inputField, paddingVertical: 12 }}
          onPress={() => setShowDueTimePicker(true)}
        >
          <Text>
            {updatedTask?.dueDate
              ? moment(updatedTask?.dueDate).format("HH:mm")
              : ""}
          </Text>
        </TouchableOpacity>
        {showDueTimePicker && (
          <DateTimePicker
            value={new Date(updatedTask.dueDate)}
            mode="time"
            display="default"
            onChange={(event, selectedDate) =>
              handleDateChange(event, selectedDate, "dueTime")
            }
          />
        )}

        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    gap: 12,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
  },
  inputField: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    marginBottom: 12,
  },
  pickerContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.5)",
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: "center",
  },
  picker: {
    height: 40,
    borderWidth: 0,
  },
  button: {
    backgroundColor: "#2CAD5E",
    padding: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default CreateScreen;
