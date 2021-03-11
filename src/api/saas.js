import axios from 'axios'
import { auth } from './firebase'
import getEnvVars from '../utils/environment';

const { saasURL } = getEnvVars();

const instance = axios.create({
    baseURL: saasURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

// for every request append firebase token to authorization header
instance.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        const token = user && (await user.getIdToken());
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;