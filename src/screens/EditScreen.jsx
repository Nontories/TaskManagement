import React, { useEffect, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker"; // Dropdown component
import DateTimePicker from "@react-native-community/datetimepicker"; // Datepicker component
import moment from "moment"; // For date formatting
import { selectTask } from "../redux/selector/selector";
import { useSelector } from "react-redux";
import useManageData from "../utils/useManageData";
import { useNavigation } from "@react-navigation/native";

const EditScreen = ({ route }) => {
  const [updatedTask, setUpdatedTask] = useState({});
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showDueDatePicker, setShowDueDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showDueTimePicker, setShowDueTimePicker] = useState(false);

  const taskList = useSelector(selectTask);
  const navigation = useNavigation();
  const { saveTasks } = useManageData();

  useEffect(() => {
    if (route?.params?.task) {
      setUpdatedTask((prevState) => ({
        ...prevState,
        ...route?.params?.task,
        startTime: route?.params?.task?.startDate, // Set time from startDate
        dueTime: route?.params?.task?.dueDate, // Set time from dueDate
      }));
    }
  }, [route?.params?.task]);

  // Function to handle input change
  const handleInputChange = (field, value) => {
    setUpdatedTask((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Function to handle date change
  const handleDateChange = (event, selectedDate, type) => {
    const currentDate = selectedDate || updatedTask[type];
    setShowStartDatePicker(false);
    setShowDueDatePicker(false);
    handleInputChange(type, moment(currentDate).toISOString());
  };

  // Function to handle time change
  const handleTimeChange = (event, selectedTime, type) => {
    const currentTime = selectedTime || updatedTask[type];
    setShowStartTimePicker(false);
    setShowDueTimePicker(false);
    handleInputChange(type, moment(currentTime).toISOString());
  };

  // Function to combine date and time for saving
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

      const index = taskList.findIndex((item) => item.id === prevTask.id);
      const updatedTaskList = [...taskList];
      updatedTaskList[index] = updatedTask;
      saveTasks(updatedTaskList);

      return { ...updatedTask };
    });
    navigation.goBack();
  };

  return (
    <>
      <Header title={"Edit"} />
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
            value={
              updatedTask?.startDate
                ? new Date(updatedTask.startDate)
                : new Date()
            }
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
            {updatedTask?.startTime
              ? moment(updatedTask?.startTime).format("HH:mm")
              : ""}
          </Text>
        </TouchableOpacity>
        {showStartTimePicker && (
          <DateTimePicker
            value={
              updatedTask?.startTime
                ? new Date(updatedTask.startTime)
                : new Date()
            }
            mode="time"
            display="default"
            onChange={(event, selectedTime) =>
              handleTimeChange(event, selectedTime, "startTime")
            }
          />
        )}

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
            value={
              updatedTask?.dueDate ? new Date(updatedTask.dueDate) : new Date()
            }
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
            {updatedTask?.dueTime
              ? moment(updatedTask?.dueTime).format("HH:mm")
              : ""}
          </Text>
        </TouchableOpacity>
        {showDueTimePicker && (
          <DateTimePicker
            value={
              updatedTask?.dueTime ? new Date(updatedTask.dueTime) : new Date()
            }
            mode="time"
            display="default"
            onChange={(event, selectedTime) =>
              handleTimeChange(event, selectedTime, "dueTime")
            }
          />
        )}

        <TouchableOpacity onPress={handleSave} style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
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

export default EditScreen;
