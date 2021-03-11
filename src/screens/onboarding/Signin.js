import React, { useState, useCallback, useContext } from "react";
import { Layout, Input, Text, Icon, Button } from '@ui-kitten/components';
import { Context as AuthContext } from '../../context/AuthContext'
import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { useFocusEffect } from '@react-navigation/native';


// form for signin and signup
const SiginScreen = ({ navigation }) => {
  const { state: { errorMessage }, emailSignin, clearState } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
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
      <Text category='h2' style={styles.title}>Welcome back</Text>
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
        accessoryRight={renderIcon}
      />

      {errorMessage ? <Text style={styles.errorMessage} status='warning'>{errorMessage}</Text> : null}

      <Button
        style={styles.button}
        onPress={() => {
          setIsLoading(true)
          emailSignin(email, password, () => {
            console.log("HIT")
            setIsLoading(false)
          })
        }}
        disabled={isLoading && !errorMessage ? true : !email || !password}
        accessoryLeft={isLoading && !errorMessage ? LoadingIndicator : null}
      >
        {isLoading && !errorMessage ? "Loading..." : "Login"}
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.routertext} status='info'>You don't have an accoount? Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.routertext} status='info'>Forgot password?</Text>
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    marginBottom: 20
  }
});

export default SiginScreen;