import React, { useContext } from "react";
import { Context as AuthContext } from '../context/AuthContext'
import { Text, StyleSheet, View, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Ionicons } from '@expo/vector-icons';

const Settings = ({ navigation }) => {
    const { signout } = useContext(AuthContext)

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <View style={styles.card}>
                    <Text style={styles.text}>Edit Profile</Text>
                    <AntDesign name="user" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("PrivacyPolicy")}>
                <View style={styles.card}>
                    <Text style={styles.text}>Privacy Policy & Terms of Service</Text>
                    <Ionicons name="newspaper-outline" size={24} color="black" />
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => signout()}>
                <View style={styles.card}>
                    <Text style={styles.text}>Sign out</Text>
                    <AntDesign name="logout" size={24} color="black" />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 30
    },
    text: {
        fontSize: 16,
    }
});

export default Settings;