import { TaskProps } from '@/screens/App';
import { Colors } from '@/utils/Colors';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';

type TaskItemProps = {
    task: TaskProps
    onComplete: (task: TaskProps) => void;
    onDelete: (task: TaskProps) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onComplete, onDelete }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.checkButton}
                onPress={() => onComplete(task)}
            >
                <Image
                    source={task.isDone
                        ? require("@/assets/checked.png")
                        : require("@/assets/unchecked.png")}
                />
            </TouchableOpacity>

            <Text style={[
                styles.descriptionText,
                task.isDone && styles.descriptionTextDone
            ]}>{task.description}</Text>

            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(task)}
            >
                <Image source={require("@/assets/delete-icon.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 3,
        backgroundColor: Colors.gray[400],
        borderRadius: 8
    },
    checkButton: {
        paddingHorizontal: 8,
    },
    descriptionText: {
        flexGrow: 1,
        maxWidth: "70%",
        textAlign: "left",
        color: Colors.gray[100],
        paddingHorizontal: 8,
    },
    descriptionTextDone: {
        color: Colors.gray[300],
        textDecorationLine: "line-through"
    },
    deleteButton: {
        paddingHorizontal: 8,
    }
});

export default TaskItem;
