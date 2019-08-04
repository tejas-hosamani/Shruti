const initState = {
  userLoggedIn: false
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPDATE_LOGIN_STATUS':
      return {
        ...state,
        userLoggedIn: action.status
      };

    case 'SIGN_OUT':
      return {
        ...state,
        userLoggedIn: false
      };

    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        userLoggedIn: true,
        authError: null
      };

    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.err.message
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        userLoggedIn: true,
        authError: null
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.err.message
      };

    default:
      return state;
  }
};

export default authReducer;
