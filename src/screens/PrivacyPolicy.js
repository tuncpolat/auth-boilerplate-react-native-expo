import React from "react";
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from "react-native";


const PrivacyPolicy = () => {
  return (
      <Layout style={styles.container}>
        <Text category='h1'>Privacy Policy</Text>
      </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

export default PrivacyPolicy;