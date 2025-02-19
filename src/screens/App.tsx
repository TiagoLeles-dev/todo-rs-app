import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../utils/Colors';
import CustomInput from '../components/CustomInput';
import { useMemo, useState } from 'react';
import TaskItem from '@/components/TaskItem';

export type TaskProps = {
  id: string;
  description: string;
  isDone: boolean
}

const activities: TaskProps[] = [
  { id: '1', description: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.', isDone: false },
  { id: '2', description: 'Atividade 2', isDone: false },
  { id: '3', description: 'Atividade 3', isDone: true },
  { id: '4', description: 'Atividade 4', isDone: false },
  { id: '41', description: 'Atividade 41', isDone: false },
  { id: '43', description: 'Atividade 42', isDone: false },
  { id: '44', description: 'Atividade 43', isDone: true },
  { id: '45', description: 'Atividade 44', isDone: false },
  { id: '46', description: 'Atividade 45', isDone: false },
];

export default function App() {

  const [taskList, setTaskList] = useState<TaskProps[]>(activities)
  const taskDoneList = useMemo(() => taskList.filter(task => task.isDone === true).length, [taskList]);
  const createdList = useMemo(() => taskList.length, [taskList])

  // const [taskDoneList, setTaskDoneList] = useState(activities.filter(task => task.isDone == true).length)
  // const [createdList, setcreatedList] = useState(activities.length)

  const handleNewTask = (task: string) => {
    Alert.alert("nova task:", task)
  }

  const handleComplete = (task: TaskProps) => {
    Alert.alert("complete task:", task.description)
  }

  const handleDelete = (task: TaskProps) => {
    Alert.alert("delete task:", task.description)
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.headerContainer}>
        <Image style={styles.logo} source={require("@/assets/Logo-2x.png")} />
      </View>

      <View style={styles.inputContainer}>
        <CustomInput onSubmit={handleNewTask} />
      </View>

      <View style={styles.countContainer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: Colors.blue.base }}>Criadas </Text>
          <Text style={styles.counterNumber}>{createdList ?? 0}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: Colors.purple.base }}>Concluidas </Text>
          <Text style={styles.counterNumber}>{taskDoneList ?? 0}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onComplete={handleComplete} onDelete={handleDelete} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[600],
    alignItems: "center"
  },
  headerContainer: {
    height: 200,
    backgroundColor: Colors.gray[700],
    width: "100%",
    alignItems: "center"
  },
  inputContainer: {
    position: 'absolute',
    top: 200 - 36,
    left: '0%',
    right: '0%',
    zIndex: 10,
  },
  countContainer: {
    marginTop: 50,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  logo: {
    marginTop: 22,
    width: 150,
    height: 150,
    resizeMode: 'contain',
    // backgroundColor: "bisque"
  },

  listContainer: {
    flex: 1,
    marginTop: 30, // Para evitar sobreposição com o input
    paddingTop: 20,
  },
  counterNumber: {
    color: Colors.gray[100],
    backgroundColor: Colors.gray[400],
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 18,
    marginLeft: 4,
    fontSize: 12
  },

  listItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  listItemText: {
    fontSize: 18,
  },
});
