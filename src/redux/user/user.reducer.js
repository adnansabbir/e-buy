import USER_ACTION_TYPES from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_SUCCESS:
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            };

        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_FAILURE:
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_FAILURE:
            return {
                ...state,
                error: action.payload
            };

        default:
            return state;

    }
};

export default userReducer;