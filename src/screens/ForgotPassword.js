import React, { useState, useCallback, useContext } from "react";
import { Layout, Input, Text, Button } from '@ui-kitten/components';
import { Context as AuthContext } from '../context/AuthContext'
import { StyleSheet } from "react-native";
import Loading from "../components/Loading";
import { useFocusEffect } from '@react-navigation/native';


// form for signin and signup
const ForgotPassword = () => {
  const { state: { passwordResetEmail, errorMessage }, forgotPassword, clearState } = useContext(AuthContext)
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // when we change nav from signup to signin remove error message
  useFocusEffect(
    useCallback(() => {
      return () => clearState();
    }, [])
  )


  return (
    <Layout style={styles.container}>
      <Text category='h2' style={styles.title}>Reset your password</Text>
      <Text style={styles.routertext}>
        Enter the email associated with your account and we'll send an email with instructions to reset your password.
      </Text>

      <Input
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={email => setEmail(email)}
        value={email}
        label='Email'
        placeholder="Your Email"
      />

      {errorMessage ? <Text style={styles.errorMessage} status='warning'>{errorMessage}</Text> : null}

      <Button
        style={styles.button}
        onPress={() => {
          setIsLoading(true)
          forgotPassword(email, () => {
            setIsLoading(false)
          })
        }}
        disabled={isLoading && !errorMessage ? true : !email}
        accessoryLeft={isLoading && !errorMessage ? Loading : null}
      >
        {isLoading && !errorMessage ? "Loading..." : "Send Instructions"}
      </Button>

      {
        passwordResetEmail ?
          <Text style={styles.routertext} status='success'>
            We have sent a password recover instructions to your email {passwordResetEmail}
          </Text> : null
      }

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

export default ForgotPassword;