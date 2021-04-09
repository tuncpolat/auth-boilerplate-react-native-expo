import React, { useContext, useState } from "react";
import { Context as AuthContext } from '../context/AuthContext'


// styled components
import { Input, Text, Button, Icon } from '@ui-kitten/components'
import { View, TouchableWithoutFeedback } from "react-native";
import Loading from "./Loading";


// custom hooks
import { useInput } from '../hooks/useInput'

export default ChangePassword = () => {

    const { state: { errorMessage }, updatePassword } = useContext(AuthContext)

    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false)
    const [errorComparePassword, setErrorComparePassword] = useState("")
    const [sendMessage, setSendMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)



    // custom hooks
    const { value: currentPassword, reset: resetCurrentPassword, bind: bindCurrentPassword } = useInput('')
    const { value: newPassword, reset: resetNewPassword, bind: bindNewPassword } = useInput('')
    const { value: confirmedPassword, reset: resetConfirmedPassword, bind: bindConfirmedPassword } = useInput('')


    const rightElementCurrentPassword = (props) => (
        <TouchableWithoutFeedback onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Icon {...props} name={showCurrentPassword ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const rightElementNewPassword = (props) => (
        <TouchableWithoutFeedback onPress={() => setShowNewPassword(!showNewPassword)}>
            <Icon {...props} name={showNewPassword ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const rightElementConfirmPassword = (props) => (
        <TouchableWithoutFeedback onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
            <Icon {...props} name={showConfirmNewPassword ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );

    const handleUpdatePassword = () => {
        if (newPassword === confirmedPassword) {
            setIsLoading(true)
            updatePassword(currentPassword, newPassword, () => {
                setSendMessage("Password changed successfully.")
                setIsLoading(false)
                resetCurrentPassword()
                resetNewPassword()
                resetConfirmedPassword()
            })

        } else {
            setErrorComparePassword("Password don't match")
        }
    }


    return (
        <View
            style={{
                paddingBottom: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}>
            <Text category='h5' style={{ marginBottom: 10, marginTop: 20 }}>Change Password</Text>

            <Input
                secureTextEntry={showCurrentPassword}
                {...bindCurrentPassword}
                label='Current Password'
                accessoryRight={rightElementCurrentPassword}
            />
            <Input
                secureTextEntry={showNewPassword}
                {...bindNewPassword}
                label='New Password'
                accessoryRight={rightElementNewPassword}
            />
            <Input
                secureTextEntry={showConfirmNewPassword}
                {...bindConfirmedPassword}
                label='Confirm Password'
                accessoryRight={rightElementConfirmPassword}
            />
            {errorComparePassword ? <Text status="error" style={{ marginTop: 10 }} >{errorComparePassword}</Text> : null}
            {errorMessage ? <Text status="error" style={{ marginTop: 10 }} >{errorMessage}</Text> : null}
            <Button
                onPress={handleUpdatePassword}
                style={{ marginTop: 10 }}
                disabled={isLoading && !errorMessage ? true : !currentPassword || !newPassword || !confirmedPassword}
                accessoryLeft={isLoading && !errorMessage ? Loading : null}
            >
                {isLoading && !errorMessage ? "Changing Password" : "Change Password "}
            </Button>
            {sendMessage ? <Text status="success" style={{ marginTop: 10 }} >{sendMessage}</Text> : null}
        </View >
    )
};
