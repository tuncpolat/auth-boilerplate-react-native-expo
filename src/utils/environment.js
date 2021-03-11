import Constants from "expo-constants";

const ENV = {
    dev: {
        saasURL: "http://192.168.1.15:5000/api"
    },
    staging: {
        saasURL: "https://kickory-server.herokuapp.com/api",
    },
    prod: {
        saasURL: "https://mycompany.com/api",
    }
};

const getEnvVars = () => {
    // What is __DEV__ ?
    // This variable is set to true when react-native is running in Dev mode.
    // __DEV__ is true when run locally, but false when published.

    if (__DEV__) {
        return ENV.dev;
    } else if (env === 'staging') {
        return ENV.staging;
    } else if (env === 'prod') {
        return ENV.prod;
    }
};

export default getEnvVars;