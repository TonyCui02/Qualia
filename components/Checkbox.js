import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import { StyleSheet } from "react-native";


export default function Checkbox(props) {
  const [checked, setChecked] = useState(false);

  return (
    <CheckBox
      title={props.title}
      checked={checked}
      onPress={() => setChecked(!checked)}
      containerStyle = {{ backgroundColor: '#FFFFFF', borderTop: 0, borderLeft: 0, borderRight: 0}}
    />
  );
}