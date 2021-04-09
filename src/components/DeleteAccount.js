import React, { useContext, useState } from "react";
import { Context as AuthContext } from '../context/AuthContext'


// styled components
import { Modal, Text, Button, Card, Input, Icon } from '@ui-kitten/components'
import { View, TouchableWithoutFeedback } from "react-native";

// custom hooks
import { useInput } from '../hooks/useInput'



export default DeleteAccount = () => {

    const { state: { errorMessage, providerId }, deleteAccount } = useContext(AuthContext)

    const { value: currentPassword, reset: resetCurrentPassword, bind: bindCurrentPassword } = useInput('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [visible, setVisible] = useState(false);

    const handleDelete = () => {
        deleteAccount(providerId, currentPassword)
    }

    const rightElementCurrentPassword = (props) => (
        <TouchableWithoutFeedback onPress={() => setShowCurrentPassword(!showCurrentPassword)}>
            <Icon {...props} name={showCurrentPassword ? 'eye-off' : 'eye'} />
        </TouchableWithoutFeedback>
    );


    return (
        <View
            style={{
                paddingBottom: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}>
            <Text category='h5' style={{ marginBottom: 10, marginTop: 20 }}>Delete Account</Text>

            <Button onPress={() => setVisible(true)}>
                DeleteAccount
            </Button>

            <Modal visible={visible}>
                <Card disabled={true}>
                    <Text style={{ marginBottom: 10 }}>Are you sure? Once you delete your account, there is no going back. Please be certain.</Text>
                    <Input
                        secureTextEntry={showCurrentPassword}
                        {...bindCurrentPassword}
                        label='Current Password'
                        accessoryRight={rightElementCurrentPassword}
                        style={{ marginBottom: 10 }}
                    />
                    <Button onPress={() => setVisible(false)} style={{ marginBottom: 10 }} appearance='outline'>
                        Cancel
                    </Button>
                    <Button
                        onPress={handleDelete}
                        status='danger'
                        disabled={!currentPassword ? true : false}
                        style={{ marginBottom: 10 }}>
                        Delete Account
                    </Button>
                </Card>
            </Modal>
        </View>
    )
};
