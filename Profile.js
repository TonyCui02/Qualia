import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar, ListItem, Header, Icon } from "react-native-elements";
import CheckBox from "./components/Checkbox";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.header}>Profile</Text>
        <Text style={styles.prompts}>Are you on a specific diet?</Text>
        <Text style={styles.prompts}>
          Let us know if you require monitoring of your foods and ingredients?
        </Text>

        <View style={[styles.card, { flexDirection: "column" }]}>
          <Avatar
            rounded
            source={{
              uri:
                "https://images.squarespace-cdn.com/content/v1/596001c2579fb355caec7aac/1517007370565-WIAY17SDUXVIG5AAVX3Y/ke17ZwdGBToddI8pDm48kOyzHbQy-kL0n4K_9mkHuJZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmLKoxsx6wp33kn5fgRqCuBXSgNoSSmWa6rmg7AwlCPJgGOqEoAQtoIVwjQZxv17FW/6+aokamei.jpg?format=500w",
            }}
          />
          <View>
            <Text>Tony</Text>
            <Text>Tonycui02@gmail.com</Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: "column" }]}>
          <Text style={styles.cardTitle}>Diet Plan </Text>
          <View style={[styles.card, { flexDirection: "column" }]}>
            <CheckBox title="Keto" />
            <CheckBox title="Paleo" />
            <CheckBox title="Vegan" />
            <CheckBox title="Mayo" />
          </View>
        </View>

        <View style={[styles.section, { flexDirection: "column" }]}>
          <Text style={styles.cardTitle}>Conditions </Text>
          <View style={[styles.card, { flexDirection: "column" }]}>
            <CheckBox title="Diabetes" />
            <CheckBox title="Cardiovascular disease" />
            <CheckBox title="Lactose intolerance" />
            <CheckBox title="Nut allergy" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingVertical: 18,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  prompts: {
    fontFamily: "Quicksand",
    color: "#FA4A0C",
    fontSize: 24,
    paddingBottom: 32,
    paddingHorizontal: 10,
    textAlign: "center",
  },
  cardTitle: {
    fontFamily: "Quicksand",
    fontWeight: 800,
    padding: 8,
    fontSize: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    width: 200,
  },
});
