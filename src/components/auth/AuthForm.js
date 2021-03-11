import React, { useState } from "react";
import { Layout, Input, Text, Icon, Button, Spinner } from '@ui-kitten/components';

import { StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';

const AlertIcon = (props) => (
    <Icon {...props} name='alert-circle-outline' />
);

const LoadingIndicator = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' />
    </View>
);

// form for signin and signup
const AuthForm = ({ title, ctaText, navigateTo, navigateToText, loading, errorMessage, onSubmit, isSignup }) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [secureTextEntry, setSecureTextEntry] = useState(true);


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
            <Text category='h2' style={styles.title}>{title}</Text>
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

            {errorMessage ? <Text style={styles.errorMessage} status='warning'>{errorMessage}</Text> : null}

            <Button
                style={styles.button}
                onPress={() => {
                    onSubmit(email, password)
                }}
                accessoryLeft={loading ? LoadingIndicator : null}
            >
                {loading ? "Loading" : ctaText}
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate(navigateTo)}>
                <Text style={styles.routertext} status='info'>{navigateToText}</Text>
            </TouchableOpacity>

            {!isSignup ? <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.routertext} status='info'>Forgot password?</Text>
            </TouchableOpacity> : null}
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

export default AuthForm;