import React, { useState, useCallback, useContext } from "react";
import { Layout, Input, Text, Icon, Button, CheckBox } from '@ui-kitten/components';
import { Context as AuthContext } from '../context/AuthContext'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Loading from "../components/Loading";
import { useFocusEffect } from '@react-navigation/native';

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);


// form for signin and signup
const Signup = ({ navigation }) => {
  const { state: { errorMessage }, emailSignup, googleSignin, clearState } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  // when we change nav from signup to signin remove error message
  useFocusEffect(
    useCallback(() => {
      return () => clearState();
    }, [])
  )

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.title}>Register now</Text>
      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={email => setEmail(email)}
        value={email}
        label='Email'
        placeholder="Your Email"
      />
      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={password => setPassword(password)} value={password}
        secureTextEntry={secureTextEntry}
        label='Password'
        placeholder="Your Password"
        caption='Should contain at least 6 symbols'
        accessoryRight={renderIcon}
        captionIcon={AlertIcon}
      />

      <CheckBox
        checked={checked}
        onChange={nextChecked => setChecked(nextChecked)}
        style={styles.checkbox}
      >
        <TouchableWithoutFeedback onPress={() => navigation.navigate("PrivacyPolicy")}>
          <Text>I've read and agree with Terms of Service and our Privacy Policy.</Text>
        </TouchableWithoutFeedback>
      </CheckBox>

      {errorMessage ? <Text style={styles.errorMessage} status='warning'>{errorMessage}</Text> : null}

      <Button
        style={styles.button}
        onPress={() => {
          setIsLoading(true)
          emailSignup(email, password)
        }}
        disabled={!email || !password || !checked}
        accessoryLeft={isLoading ? Loading : null}
      >
        {isLoading ? "Loading" : "Create Account"}
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Text style={styles.routertext} status='info'>You already have an account? Login</Text>
      </TouchableOpacity>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "stretch",
    paddingHorizontal: 20
  },
  title: {
    marginBottom: 20
  },
  input: {
    marginBottom: 20,
  },
  button: {
    marginBottom: 20
  },
  routertext: {
    marginBottom: 10
  },
  checkbox: {
    marginBottom: 20
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 20
  }
});

export default Signup;