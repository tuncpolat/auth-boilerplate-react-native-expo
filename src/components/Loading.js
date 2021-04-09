import React from "react";
import { Spinner } from '@ui-kitten/components';
import { StyleSheet, View } from "react-native";

export default Loading = (props) => (
    <View style={[props.style, styles.indicator]}>
        <Spinner size='small' />
    </View>
);

const styles = StyleSheet.create({
    indicator: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});