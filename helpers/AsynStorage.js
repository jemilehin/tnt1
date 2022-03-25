import AsyncStorage from "@react-native-async-storage/async-storage";

export const StoreData = async (type) => {
  let keys = [];
  if (type === "multigetitem") {
    try {
      keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      if (values.length) {
        return(JSON.parse(values))
      }
    } catch (e) {
      console.log(e)
    }
  }
};
