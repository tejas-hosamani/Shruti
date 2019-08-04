import db, { auth } from '../config/fbConfig';

export const updateLoginStatus = () => {
  return dispatch => {
    // Async CODE
    auth.onAuthStateChanged(() => {
      dispatch({
        type: 'UPDATE_LOGIN_STATUS',
        status: !!auth.currentUser
      });
    });
  };
};

export const loginWithEmail = credential => {
  return dispatch => {
    auth
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const signUpWithEmail = data => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(resp => {
        return db
          .collection('users')
          .doc(resp.user.uid)
          .set({
            firstName: data.firstName,
            city: data.city
          });
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'SIGNUP_ERROR', err });
      });
  };
};

export const signOut = () => {
  return dispatch => {
    auth
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGN_OUT' });
      })
      .catch(err => {
        dispatch({ type: 'SIGN_OUT_ERROR', err });
      });
  };
};
