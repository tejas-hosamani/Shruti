import { auth } from "../config/fbConfig";
import db from '../config/fbConfig'


export const updateLoginStatus = () => {
    return (dispatch, getState) => {
        // Async CODE
        auth.onAuthStateChanged(() => {
            dispatch({ type: 'UPDATE_LOGIN_STATUS', status: auth.currentUser ? true : false})
        })

    }
}

export const loginWithEmail = (creds) => {
    return (dispatch, getState) => {
        auth.signInWithEmailAndPassword(creds.email, creds.password)
        .then(() => {
            dispatch({ type: 'LOGIN_SUCCESS' });
        })
        .catch((err) => {
            dispatch({ type: 'LOGIN_ERROR', err });
        })
    }
}

export const signUpWithEmail = (data) => {
    return (dispatch, getState) => {
        auth.createUserWithEmailAndPassword(data.email, data.password)
        .then(resp => {
            return db.collection('users').doc(resp.user.uid).set({
              firstName: data.firstName,
              city: data.city
            });
          }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
          }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err});
          });
    }
}

export const signOut = () => {
    return (dispatch, getState) => {
        auth.signOut().then(function() {
            dispatch({type: 'SIGN_OUT'})
          }).catch(function(error) {
            console.log(error)
          });
    }
}