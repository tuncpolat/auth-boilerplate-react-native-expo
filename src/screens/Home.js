import React from "react";
import { Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from "react-native";

const Home = () => {
  return (
    <Layout style={styles.container}>
      <Text category='h1'>HOME</Text>
    </Layout>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
});

export default Home;