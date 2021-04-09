import React from "react";
import { Layout  } from '@ui-kitten/components';
import { StyleSheet, ScrollView } from "react-native";

import Email from "../components/Email";
import ChangePasssword from "../components/ChangePassword";
import DeleteAccount from "../components/DeleteAccount";



const Profile = () => {
    return (
        <ScrollView style={styles.container}>
            <Email />
            <ChangePasssword />
            <DeleteAccount />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default Profile;