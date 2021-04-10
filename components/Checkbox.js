import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebase from "firebase/app"
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnuZphC98z9JuJisyT8uviQxOAtqGrjPM",
  authDomain: "food-recommender-94a7c.firebaseapp.com",
  projectId: "food-recommender-94a7c",
  storageBucket: "food-recommender-94a7c.appspot.com",
  messagingSenderId: "897997159875",
  appId: "1:897997159875:web:e77f1b130f6a5c66271176",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  
  useEffect(() => {
    const getChecked = async() => {
      const value = await db.collection("preferences").doc(props.title).get();
      setChecked(value);
    }
    getChecked();
  }, [checked])

  async function handleCheck() {
    setChecked(!checked);
    db.collection("preferences").doc(props.title).set({
      enabled : `${checked}`
    });
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
      onPress={() => handleCheck}
      containerStyle={{
        backgroundColor: "#FFFFFF",
        borderTop: 0,
        borderLeft: 0,
        borderRight: 0,
      }}
    />
  );
}
