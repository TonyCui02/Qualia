import * as React from "react";
import {
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Button, Text, useTheme, makeStyles } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";
import { registration } from "../api/firebaseMethods";

export default function SignUpScreen({ navigation, props }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const email = watch("email", "");
  const password = watch("password", "");
  const onSubmit = (data) => registration(email, password);

  const { theme } = useTheme();
  const styles = useStyles(props);

  function login() {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{ height: 64, width: 64 }}
            />
            <Image
              source={require("../../assets/images/logoText.png")}
              style={{ height: 48, resizeMode: "contain" }}
            />
            <Text style={styles.title}>Sign up to get started</Text>
          </View>
          <TouchableOpacity style={styles.googleBtn}>
            <Image
              source={require("../../assets/images/google.png")}
              style={{ height: 24, width: 24, margin: 8 }}
            />
            <Text style={{ fontWeight: "bold", color: theme.colors.grey1 }}>
              Continue With Google
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 32,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.grey4,
              }}
            />
            <View>
              <Text
                style={{
                  color: theme.colors.grey2,
                  width: 84,
                  textAlign: "center",
                }}
              >
                OR
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                height: 1,
                backgroundColor: theme.colors.grey4,
              }}
            />
          </View>
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Email Address"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              defaultValue=""
              rules={{ required: true }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onBlur={onBlur}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              defaultValue=""
              rules={{ required: true }}
            />
            <View style={{ marginVertical: 16 }}>
              <Button
                title="Sign Up"
                disabled={!email || !password}
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
              />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const useStyles = makeStyles((theme, props) => ({
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: theme.colors.grey2,
    textAlign: "center",
    margin: 16,
  },
  container: {
    backgroundColor: "#fffffe",
    flex: 1,
  },
  content: {
    flex: 18,
    justifyContent: "center",
    marginHorizontal: 16,
  },
  logoWrapper: {
    alignItems: "center",
    margin: 32,
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.colors.grey4,
    borderTopWidth: 1,
  },
  footerText: {
    color: theme.colors.grey3,
  },
  input: {
    margin: 2,
    height: 40,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    borderRadius: 6,
    paddingLeft: 12,
    backgroundColor: "#fafafa",
  },
  button: {
    margin: 6,
  },
  googleBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: theme.colors.grey2,
    height: 40,
    borderRadius: 4,
  },
  link: {
    color: theme.colors.primary,
    fontWeight: "bold",
  },
}));
