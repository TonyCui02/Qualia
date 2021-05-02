import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import {
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import axios from "axios";
import { Avatar, Card } from "react-native-elements";

export default function FoodInfo({ route, navigation }) {
  const [found, setFound] = useState(-1);
  const [frontImage, setFrontImage] = useState(null);
  const [keywords, setKeywords] = useState(null); // a list of keywords
  const [brand, setBrand] = useState(null);
  const [nutriments, setNutriments] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [allergy, setAllergy] = useState(null);

  // algorithm for determining recommendation
  const [recommend, setRecommend] = useState(true);
  const [diabetes, setDiabetes] = useState(false);
  const [lactose, setLactose] = useState(false);
  const [nut, setNut] = useState(false);

  const [name, setName] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    navigation.setParams({
      barcode: route.params.barcode,
    });
  }, []);

  useEffect(() => {
    // Reset recommendations
    setRecommend(true);
    setDiabetes(false);
    setLactose(false);
    setNut(false);

    let apiUrl =
      "https://au.openfoodfacts.org/api/v0/product/" + route.params.barcode;
    axios
      .get(apiUrl)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [route]);

  // console.log(data);

  useEffect(() => {
    if (data) {
      if (data.status === 1) {
        setFrontImage(data.product.image_front_url); //image_front_small_url
        setBrand(data.product.brands);
        setNutriments(data.product.nutriments);
        setIngredients(data.product.ingredients_text);
        setName(data.product.product_name);
        setAllergy(data.product.ingredients_tags);
        setKeywords(data.product._keywords);
        setFound(1);
      } else {
        setFound(0);
      }
    }
  }, [data]);

  useEffect(() => {
    if (nutriments && allergy) {
      analyse();
    }

    function analyse() {
      let diabetes = true;
      let nut = true;
      let lact = true;
      let messages = {
        diabetes: [],
        nut: [],
        lact: [],
      };

      if (diabetes) {
        messages.diabetes.push("diabetes");
        if (nutriments.sugars >= 15) {
          setDiabetes(true);
          setRecommend(false);
          messages.diabetes.push("high sugar");
        }
      }

      if (nut) {
        messages.nut.push("a nut allergy");
        allergy.forEach((ingredient) => {
          if (ingredient.includes("nut")) {
            setNut(true);
            setRecommend(false);
            messages.nut.push("contains nuts");
          }
        });
      }

      if (lact) {
        messages.lact.push("lactose intolerance");
        allergy.forEach((ingredient) => {
          if (ingredient.includes("milk")) {
            setLactose(true);
            setRecommend(false);
            messages.lact.push("contains milk");
          }
        });
        keywords.forEach((ingredient) => {
          if (ingredient.includes("milk")) {
            setLactose(true);
            setRecommend(false);
            messages.lact.push("contains milk");
          }
        });
      }

      console.log(allergy);
      // console.log(messages)
    }
  }, [nutriments, allergy]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        background: "#F6F6F9",
      }}
    >
      {found === -1 && <ActivityIndicator color={"#FA4A0C"} />}
      {found === 0 && (
        <Text style={styles.notFoundText}>
          Sorry, the food you are looking for is not in the database.
        </Text>
      )}
      {found === 1 && (
        <SafeAreaView style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View style={styles.itemCard}>
              <Avatar
                size="xlarge"
                source={{
                  uri: frontImage,
                }}
              />
              <Text style={styles.itemHeading}>{name}</Text>
            </View>
            {/* <Recommend /> */}
            <Text style={styles.recommend}>
              {recommend ? "Recommended" : "Not Recommended"}
            </Text>
            {nut ? (
              <Text style={styles.bullet}>
                - You have a <Text style={styles.highlight}>Nut Allergy</Text>{" "}
                and this item contains{" "}
                <Text style={styles.highlight}>Nuts</Text>
              </Text>
            ) : null}
            {diabetes ? (
              <Text style={styles.bullet}>
                - You have <Text style={styles.highlight}>Diabetes</Text> and
                this item contains a high quantity of{" "}
                <Text style={styles.highlight}>Sugar</Text>
              </Text>
            ) : null}
            {lactose ? (
              <Text style={styles.bullet}>
                - You have{" "}
                <Text style={styles.highlight}>Lactose Intolerance</Text> and
                this item contains <Text style={styles.highlight}>Milk</Text>
              </Text>
            ) : null}
            <Card containerStyle={{ borderRadius: 24 }}>
              <Card.Title>Ingredients</Card.Title>
              <Card.Divider />
              <Text style={styles.body}>{ingredients}</Text>
              <Card.Title>Nutrients (per 100g)</Card.Title>
              <Card.Divider />
              <View style={styles.nutrimentsWrapper}>
                <Text style={styles.nutriments}>
                  Carbohydrates: {nutriments.carbohydrates} g
                </Text>
                <Text style={styles.nutriments}>Fat: {nutriments.fat}</Text>
                <Text style={styles.nutriments}>
                  Energy: {nutriments.energy} kcal
                </Text>
                <Text style={styles.nutriments}>
                  Proteins: {nutriments.proteins} g
                </Text>
                <Text style={styles.nutriments}>
                  Sodium: {nutriments.sodium} g
                </Text>
                <Text style={styles.nutriments}>
                  Sugar: {nutriments.sugars} g
                </Text>
              </View>
            </Card>
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  notFoundText: {
    fontSize: 25,
    color: "#FA4A0C",
    textAlign: "center",
  },
  container: {
    alignItems: "center",
  },
  itemCard: {
    paddingTop: 120,
    alignItems: "center",
  },
  itemHeading: {
    fontFamily: "Quicksand_Regular",
    fontSize: 24,
    padding: 15,
    textAlign: "center",
  },
  recommend: {
    fontFamily: "Quicksand_Regular",
    fontSize: 24,
    padding: 15,
    color: "#FA4A0C",
  },
  body: {
    fontFamily: "Quicksand",
    fontSize: 12,
    padding: 15,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  bullet: {
    fontFamily: "Quicksand_Regular",
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  highlight: {
    color: "#FA4A0C",
  },
  nutrimentsWrapper: {
    alignItems: "center",
  },
  nutriments: {
    fontFamily: "Quicksand_Regular",
    fontSize: 12,
    paddingVertical: 2,
    color: "#FA4A0C",
  },
});
