import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setTaskList } from "../redux/reducers/TaskReducer";
import { useEffect } from "react";

const TASKS_KEY = "taskData";

const taskData = [
  {
    id: 1,
    name: "Inspect Construction Site",
    description: "Conduct a safety inspection at the new construction site.",
    status: "Pending",
    priority: "High",
    startDate: "2024-11-09T08:00:00Z",
    dueDate: "2024-11-10T17:00:00Z",
    location: {
      latitude: 10.762622,
      longitude: 106.660172,
    },
    images: [],
    assignedTo: {
      id: 1001,
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "+1234567890",
    },
    tags: ["inspection", "safety", "construction"],
    note: [
      {
        id: 1,
        title: "Remine check safety",
        date: "2024-11-09T09:30:00Z",
        text: "Make sure to check the safety gear for everyone.",
      },
    ],
  },
];

const useManageData = () => {
  const dispatch = useDispatch();
  // Load tasks from AsyncStorage

  const loadTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
      if (jsonValue) {
        const parsedTasks = JSON.parse(jsonValue);
        dispatch(setTaskList(parsedTasks));
        return parsedTasks;
      }
      return []; // If there's no data, return an empty array
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return [];
    }
  };

  const setDedaultTasks = async () => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(taskData));
      dispatch(setTaskList(taskData));
    } catch (error) {
      console.error("Failed to save default tasks:", error);
    }
  };

  const clearTasks = async () => {
    try {
      const jsonValue = await AsyncStorage.removeItem(TASKS_KEY);
      if (jsonValue) {
        dispatch(setTaskList([]));
      }
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Failed to load tasks:", error);
      return [];
    }
  };

  // Save tasks to AsyncStorage
  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasksToSave));
      dispatch(setTaskList(tasksToSave));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  };

  // Create a new task
  const createTask = async (tasks, newTask) => {
    const updatedTasks = [...tasks, { ...newTask, id: Date.now() }];
    await saveTasks(updatedTasks);
  };

  // Update an existing task
  const updateTask = async (tasks, taskId, updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    await saveTasks(updatedTasks);
  };

  // Delete a task by ID
  const deleteTask = async (tasks, taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    await saveTasks(filteredTasks);
  };

  return {
    createTask,
    clearTasks,
    readTasks: loadTasks,
    updateTask,
    saveTasks,
    deleteTask,
    setDedaultTasks,
  };
};

export default useManageData;
