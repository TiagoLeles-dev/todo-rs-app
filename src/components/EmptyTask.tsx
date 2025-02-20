import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Colors } from '@/utils/Colors';


const EmptyTask: React.FC = () => {
    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("@/assets/clipboard-icon.png")} />

            <Text style={styles.title}>Você ainda não tem tarefas cadastradas</Text>
            <Text style={[styles.title, styles.subtitle]}>Crie tarefas e organize seus itens a fazer</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 10,
        marginVertical: 3,
    },
    image: {
        marginBottom: 20
    },
    title: {
        flexGrow: 1,
        textAlign: "left",
        fontSize: 14,
        color: Colors.gray[300],
        fontWeight: "bold"
    },
    subtitle: {
        fontWeight: "regular"
    }
});

export default EmptyTask;
