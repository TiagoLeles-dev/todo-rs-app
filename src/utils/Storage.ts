import AsyncStorage from "@react-native-async-storage/async-storage";

const setItem = (key: string) => async (item: any) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
        console.warn(error);
    }
};

const getItem = (key: string) => async (defaultValue: any) => {
    try {
        const serializedItem = await AsyncStorage.getItem(key);
        if (serializedItem) {
            const parsedItem = JSON.parse(serializedItem);
            return defaultValue !== undefined && parsedItem === null
                ? defaultValue
                : parsedItem;
        } else {
            return defaultValue;
        }
    } catch (error) {
        console.warn(error);
    }
};

const removeItem = (key: string) => async () => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.warn(error);
    }
};

const keys = {
    tasks: 'tasks',
};

export const storage = {
    tasks: {
        get: getItem(keys.tasks),
        set: setItem(keys.tasks),
        remove: removeItem(keys.tasks),
    },
};
