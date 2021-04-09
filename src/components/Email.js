import React, { useContext, useState } from "react";
import { Context as AuthContext } from '../context/AuthContext'


// styled components
import { Input, Text, Button } from '@ui-kitten/components'

import { View } from "react-native";



export default Email = () => {

    const { state: { email, emailVerified }, sendVerificationMail } = useContext(AuthContext)

    const [sendMessage, setSendMessage] = useState("")

    const handleSendVerificationMail = () => {
        sendVerificationMail(email, () => {
            setSendMessage(`Verification email sent.`)
        })
    }

    const renderVerified = () => (
        <Text status={emailVerified ? "success" : "warning"}>{emailVerified ? "Verified" : "Not Verified"}</Text>
    );


    return (
        <View
            style={{
                paddingBottom: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}>
            <Text category='h5' style={{ marginBottom: 10, marginTop: 20 }}>Email</Text>

            <Input
                value={email}
                label='Email'
                accessoryRight={renderVerified}
                disabled={true}
            />
            {!emailVerified ?
                <>
                    <Button onPress={handleSendVerificationMail} disabled={sendMessage ? true : false} >
                        Send verification mail
                    </Button>
                    {sendMessage ? <Text status="success" style={{ marginTop: 10 }} >{sendMessage}</Text> : null}
                </>
                : null
            }
        </View>
    )
};
