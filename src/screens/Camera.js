import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";

export default function Camera({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isDigits, setIsDigits] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    let isDigits = /^\d+$/.test(data);
    if (isDigits) {
      // alert(data)
      navigation.navigate("FoodInfo", {
        barcode: data,
      });
    } else {
      alert(
        `Invalid barcode with type ${type} and data ${data} has been scanned!`
      );
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (!isFocused) {
    return <View></View>;
  } else {
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  textContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  square: {
    width: 220,
    height: 150,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFEEEE",
  },
  horizentalLine: {
    width: 1000,
    height: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FA4A0C",
  },
  verticalLine: {
    width: 100,
    height: 570,
    backgroundColor: "#FA4A0C",
  },
  image: {
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 200,
  },
  image2: {
    alignItems: "center",
    justifyContent: "center",
    width: 420,
    height: 570,
  },
});
