import React from 'react';
import { Provider as AuthProvider } from '../context/AuthContext'
import Routes from './Routes';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// styles
import { default as theme } from "../style/custom-theme.json"; // <-- Import app theme
import { default as mapping } from '../style/mapping.json'; // <-- Import app mapping (for fonts)

export default function Providers() {

    console.ignoredYellowBox = ['Remote debugger'];


    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva}
                theme={{ ...eva.light, ...theme }}
                customMapping={mapping}
            >
                <AuthProvider>
                    <Routes />
                </AuthProvider>
            </ApplicationProvider>
        </>
    );
}


