import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, Image, TouchableOpacityProps, TextInputProps } from 'react-native';
import { Colors } from '../utils/Colors';

type CustomInputProps = TouchableOpacityProps & TextInputProps & {
    isLoading?: boolean;
    onSubmit: (text: string) => void;
};

const CustomInput: React.FC<CustomInputProps> = ({ onSubmit, children, style, isLoading = false, ...rest }) => {

    const [text, setText] = useState<string>("")

    const handlePress = () => {
        if (text.trim()) {
            onSubmit(text); // Chama a função passada pelo pai
            setText(''); // Limpa o campo
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, text ? styles.inputWithBorder : null]}
                placeholder='Adicione uma nova tarefa'
                placeholderTextColor={Colors.gray[300]}
                value={text}
                onChangeText={setText}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Image source={require("@/assets/plus_icon-1x.png")} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        gap: 4,
        paddingVertical: 10,
    },
    input: {
        backgroundColor: Colors.gray[500],
        borderWidth: 1,
        borderColor: Colors.gray[700],
        borderRadius: 6,
        width: "75%",
        height: 52,
        fontSize: 16,
        paddingHorizontal: 15,
        fontWeight: 'regular',
        color: Colors.gray[100],

    },
    inputWithBorder: {
        borderColor: Colors.purple.purleDark,
        borderWidth: 2,
    },
    button: {
        backgroundColor: Colors.blue.darkBLue,
        justifyContent: "center",
        alignItems: "center",
        width: 52,
        height: 52,
        borderRadius: 6,
    }
})

export default CustomInput;