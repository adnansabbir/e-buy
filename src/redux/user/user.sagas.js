import {takeLatest, put} from 'redux-saga/effects'
import USER_ACTION_TYPES from "./user.types";
import {auth, googleProvider, createUserProfileDocument} from "../../firebase/firebase.utils";
import {all, call} from "redux-saga/effects";
import {googleSignInSuccess, googleSignInFailure} from "./user.actions";

function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSignInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        put(googleSignInFailure(error));
    }
}

function* onGoogleSignInStart() {
    yield takeLatest(
        USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart)
    ])
}