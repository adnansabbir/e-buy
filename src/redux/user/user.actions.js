import USER_ACTION_TYPES from "./user.types";

export const googleSignInStart = () => ({
    type: USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (credentials) => ({
    type: USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
    payload: credentials
});

export const signInSuccess = (user) => ({
    type: USER_ACTION_TYPES.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: USER_ACTION_TYPES.SIGN_IN_FAILURE,
    payload: error
});