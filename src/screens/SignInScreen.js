import * as React from "react";
import {
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text, useTheme, makeStyles } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignInScreen({ navigation, props }) {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const email = watch("email", "");
  const password = watch("password", "");
  const onSubmit = (data) => console.log(data);

  const { theme } = useTheme();
  const styles = useStyles(props);

  function login() {}

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
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
              <Text style={styles.forgotPass}>Forgotten password?</Text>
              <Button
                title="Log in"
                disabled={!email || !password}
                onPress={handleSubmit(onSubmit)}
                style={styles.button}
              />
            </View>
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
            <TouchableOpacity style={styles.googleBtn}>
              <Image
                source={require("../../assets/images/google.png")}
                style={{ height: 24, width: 24, margin: 8 }}
              />
              <Text style={{ fontWeight: "bold", color: theme.colors.grey1 }}>
                Continue With Google
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.link}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const useStyles = makeStyles((theme, props) => ({
  container: {
    backgroundColor: "#fffffe",
    flex: 1,
  },
  content: {
    flex: 1,
    // justifyContent: "center",
    marginHorizontal: 32,
  },
  logoWrapper: {
    alignItems: "center",
    margin: 26,
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
  forgotPass: {
    color: theme.colors.primary,
    textAlign: "right",
    marginTop: 6,
    marginBottom: 24,
  },
}));
