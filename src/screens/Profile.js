import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar, ListItem, Header, Icon, Button } from "react-native-elements";
import CheckBox from "../components/Checkbox";
import { signOut } from "../api/firebaseMethods";

export default function Profile() {

  function handleSignOut() {
    signOut();
    navigation.replace('SignIn');
  }

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

        <View style={[styles.card, { flexDirection: "row" }]}>
          <Avatar
            size="medium"
            rounded
            source={{
              uri:
                "https://images.squarespace-cdn.com/content/v1/596001c2579fb355caec7aac/1517007370565-WIAY17SDUXVIG5AAVX3Y/ke17ZwdGBToddI8pDm48kOyzHbQy-kL0n4K_9mkHuJZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmLKoxsx6wp33kn5fgRqCuBXSgNoSSmWa6rmg7AwlCPJgGOqEoAQtoIVwjQZxv17FW/6+aokamei.jpg?format=500w",
            }}
            containerStyle={{ marginHorizontal: 8 }}
          />
          <View>
            <Text style={styles.personName}>Tony Cui</Text>
            <Text style={styles.personEmail}>Tonycui02@gmail.com</Text>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: "column" }]}>
          <Text style={styles.cardTitle}>Diet Plan </Text>
          <View style={[styles.card, { flexDirection: "column" }]}>
            <CheckBox title="Keto" id="keto"/>
            <CheckBox title="Paleo" id="paleo"/>
            <CheckBox title="Vegan" id="vegan"/>
            <CheckBox title="Mayo Clinic" id="mayo"/>
          </View>
        </View>

        <View style={[styles.section, { flexDirection: "column" }]}>
          <Text style={styles.cardTitle}>Conditions </Text>
          <View style={[styles.card, { flexDirection: "column" }]}>
            <CheckBox title="Diabetes" id="diabetes"/>
            <CheckBox title="Cardiovascular disease" id="cardio"/>
            <CheckBox title="Lactose intolerance" id="lact"/>
            <CheckBox title="Nut allergy" id="nut"/>
          </View>
        </View>
        <Button onPress={handleSignOut}>
          Sign out
        </Button>
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
    fontWeight: "600",
    padding: 8,
    fontSize: 26,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 16,
    width: 300,
  },
  personName: {
    fontFamily: "Quicksand",
    fontSize: 28,
    fontWeight: "900",
  },
  personEmail: {
    fontFamily: "Quicksand",
  },
});
