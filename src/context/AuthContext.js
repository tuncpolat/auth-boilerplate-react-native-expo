import createDataContext from './createDataContext'
import saasApi from '../api/saas'
import { auth, firebase } from "../api/firebase";

// auth context & basic user context for settings

const authReducer = (state, action) => {
    switch (action.type) {
        case "signin":
            return { authenticated: action.payload.authenticated, email: action.payload.email, photoURL: action.payload.photoURL, emailVerified: action.payload.emailVerified, errorMessage: "", providerId: action.payload.providerId, loading: false }
        case "forgot_password":
            return { ...state, passwordResetEmail: action.payload, errorMessage: "", loading: false }
        case "update_profile_image":
            return { ...state, photoURL: action.payload, errorMessage: "", loading: false }
        case "error":
            return { ...state, errorMessage: action.payload, loading: false }
        case "clear_state":
            return { ...state, email: "", photoURL: "", emailVerified: false, passwordResetEmail: "", errorMessage: "", providerId: "", loading: false }
        case "signout":
            return { ...state, authenticated: null, loading: false }
        default:
            return state
    }
}

const googleSignin = (dispatch) => async (callback) => {
    try {
        //1 - init Google Auth Provider
        const provider = new firebase.auth.GoogleAuthProvider();
        //2 - create the popup signIn
        await auth.signInWithPopup(provider).then(
            async (result) => {
                const user = firebase.auth().currentUser // oAuth user directly from google
                const res = await saasApi.post('/auth/firebase-login', { user }) // login user and fetch logged in user from db
                const dbUser = res.data // db user will have photoURL, (username)name etc.
                dispatch({ type: "signin", payload: { authenticated: true, email: user.email, photoURL: dbUser.photoURL, emailVerified: user.emailVerified, providerId: dbUser.providerId } })
                callback() // push route
            }
        );
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const emailSignin = (dispatch) => async (email, password, callback) => {
    try {
        const { user } = await auth.signInWithEmailAndPassword(email, password) //oAuthUser
        const res = await saasApi.post('/auth/firebase-login', { user }) // login user and fetch logged in user from db
        const dbUser = res.data // db user will have photoURL, (username)name etc.
        dispatch({ type: "signin", payload: { authenticated: true, email: user.email, photoURL: dbUser.photoURL, emailVerified: user.emailVerified, providerId: dbUser.providerId } })
        console.log("DISPATCHED")
        callback()
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const emailSignup = (dispatch) => async (email, password, callback) => {
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password)
        user.sendEmailVerification() // send email verification to user
        console.log("USER", user)
        const res = await saasApi.post('/auth/firebase-login', { user }) // login user and fetch logged in user from db
        const dbUser = res.data // db user will have photoURL, (username)name etc.
        dispatch({ type: "signin", payload: { authenticated: true, email: user.email, photoURL: dbUser.photoURL, emailVerified: user.emailVerified, providerId: dbUser.providerId } })
        callback()

    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const forgotPassword = (dispatch) => async (email, callback) => {
    try {
        await auth.sendPasswordResetEmail(email) // send email to reset password
        dispatch({ type: "forgot_password", payload: email })
        callback()
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const updatePassword = dispatch => async (currentpassword, newpassword, callback) => {
    try {
        const user = auth.currentUser
        const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentpassword)
        await user.reauthenticateWithCredential(credentials)
        await user.updatePassword(newpassword)
        dispatch({ type: "update_password" })
        callback()
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const updatePhotoURL = dispatch => async (photoTargetUrl, callback) => {
    try {
        const { data } = await saasApi.put('/user/update-photo-url', { photoURL: photoTargetUrl }) // update image
        dispatch({ type: "update_profile_image", payload: data })
        callback()
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const deleteAccount = dispatch => async (providerId, currentpassword) => {
    try {
        const user = auth.currentUser
        if (providerId === "password") {
            // reauthenticate if password/email sigin
            const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentpassword)
            await user.reauthenticateWithCredential(credentials)
        } else if (providerId === "google.com") {
            // reauthenticate
            const provider = new firebase.auth.GoogleAuthProvider();
            await user.reauthenticateWithPopup(provider)
        } else {
            dispatch({ type: "error", payload: "No signin provider matches." })
        }

        // delete account
        await saasApi.delete('/user/delete-account') // delete user in db
        await user.delete()
        dispatch({ type: "signout" })

    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const sendVerificationMail = (dispatch) => async (email, callback) => {
    try {
        if (email) {
            const user = auth.currentUser
            if (user.emailVerified === false) {
                user.sendEmailVerification()
                callback()
            }
        }
    } catch (error) {
        dispatch({ type: "error", payload: error.message })
    }
}

const signout = dispatch => async () => {
    auth.signOut()
    dispatch({ type: "signout" })
}

const clearState = dispatch => () => {
    dispatch({ type: "clear_state" })
}

const checkIfAuthenticated = dispatch => async () => {
    auth.onAuthStateChanged(async (user) => {
        // if user is logged in fetch user from db
        if (user) {
            const res = await saasApi.get('/user') // fetch logged in user from db
            const dbUser = res.data
            dispatch({ type: "signin", payload: { authenticated: true, email: user.email, photoURL: dbUser.photoURL, emailVerified: user.emailVerified, providerId: dbUser.providerId } })
        } else {
            dispatch({ type: "signout" });
        }
    });
}

export const { Context, Provider } = createDataContext(authReducer,
    {
        googleSignin,
        emailSignin,
        emailSignup,
        forgotPassword,
        updatePassword,
        updatePhotoURL,
        deleteAccount,
        sendVerificationMail,
        signout,
        clearState,
        checkIfAuthenticated
    },
    {
        authenticated: null,
        email: "",
        photoURL: "",
        emailVerified: false,
        passwordResetEmail: "",
        errorMessage: "",
        providerId: "",
        loading: true
    }
)

