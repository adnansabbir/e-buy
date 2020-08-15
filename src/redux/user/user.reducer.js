import UserActionType from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    disableSignUpSignInButtons: false,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UserActionType.GOOGLE_SIGN_IN_START:
        case UserActionType.EMAIL_SIGN_IN_START:
            return {
                ...state,
                disableSignUpSignInButtons: true
            };

        case UserActionType.SIGN_UP_START:
            return {
                ...state,
                disableSignUpSignInButtons: true,
            };


        case UserActionType.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                disableSignUpSignInButtons: false,
                error: null
            };

        case UserActionType.SIGN_UP_SUCCESS:
            return {
                ...state,
                disableSignUpSignInButtons: false,
                error: null
            };

        case UserActionType.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                disableSignUpSignInButtons: false,
                error: null
            };


        case UserActionType.SIGN_IN_FAILURE:
        case UserActionType.SIGN_OUT_FAILURE:
        case UserActionType.SIGN_UP_FAILURE:
            return {
                ...state,
                disableSignUpSignInButtons: false,
                error: action.payload
            };

        default:
            return state;

    }
};

export default userReducer;