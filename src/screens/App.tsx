import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
import { Colors } from '../utils/Colors';
import CustomInput from '../components/CustomInput';
import { useEffect, useMemo, useState } from 'react';
import TaskItem from '@/components/TaskItem';
import EmptyTask from '@/components/EmptyTask';
import { storage } from '@/utils/Storage';

export type TaskProps = {
  id: string;
  description: string;
  isDone: boolean
}

export default function App() {

  const [taskList, setTaskList] = useState<TaskProps[]>([])
  const taskDoneList = useMemo(() => taskList.filter(task => task.isDone === true).length, [taskList]);
  const createdList = useMemo(() => taskList.length, [taskList])

  useEffect(() => {
    const getTasks = async () => {
      const storageTasks = await storage.tasks.get([])
      if (storageTasks) {
        setTaskList(storageTasks)
      }
    }

    getTasks()
  }, [])

  useEffect(() => {

    const updateStorage = async () => {
      await storage.tasks.set(taskList)
    }

    updateStorage()
  }, [taskList])

  const handleNewTask = (taskDescription: string) => {
    if (!taskDescription.trim()) return;

    const newTask: TaskProps = {
      id: Date.now().toString(),
      description: taskDescription,
      isDone: false,
    };

    setTaskList(prevTasks => [...prevTasks, newTask]);
  }

  const handleComplete = (task: TaskProps) => {
    setTaskList(prevTasks =>
      prevTasks.map(t =>
        t.id === task.id ? { ...t, isDone: !t.isDone } : t
      )
    );
  };

  const handleDelete = (task: TaskProps) => {
    if (!task.isDone) {
      Alert.alert(
        "Atenção",
        `Tarefa não concluida, deseja realmente excluir a tarefa? \n\n ${task.description}`,
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => {
              setTaskList(prevTasks => prevTasks.filter(item => item.id !== task.id));
            },
          },
        ]
      );
    } else {
      setTaskList(prevTasks => prevTasks.filter(item => item.id !== task.id));
    }
  };


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

      {taskList.length === 0 && <View style={styles.lineSeparator} />}

      <View style={styles.listContainer}>
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem task={item} onComplete={handleComplete} onDelete={handleDelete} />
          )}
          ListEmptyComponent={<EmptyTask />}
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
  lineSeparator: {
    height: 1.5,
    width: "90%",
    marginTop: 20,
    backgroundColor: Colors.gray[400]
  },
  logo: {
    marginTop: 22,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
    paddingTop: 8,
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
