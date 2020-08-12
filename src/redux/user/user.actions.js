import USER_ACTION_TYPES from "./user.types";

export const setCurrentUser = user => ({
    type: USER_ACTION_TYPES.SET_CURRENT_USER,
    payload: user
});

export const googleSignInStart = () => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const googleSignInSuccess = (user) => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
});

export const googleSignInFailure = error => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (credentials) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: credentials
});

export const emailSignInSuccess = (user) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_SUCCESS,
    payload: user
});

export const emailSignInFailure = error => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_FAILURE,
    payload: error
});