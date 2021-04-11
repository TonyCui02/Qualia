import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem(props.id);
        if (value !== null) {
          setChecked(checked);
        }
        // console.log(value)
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  function handleCheck() {
    const prevChecked = checked;
    const newChecked = !prevChecked;
    storeData(props.id, newChecked);
    setChecked(newChecked);
    console.log(props.id + newChecked);
  }

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return (
    <CheckBox
      title={props.title}
      checked={checked}
      onPress={() => handleCheck()}
      containerStyle={{
        backgroundColor: "#FFFFFF",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
      }}
    />
  );
}
