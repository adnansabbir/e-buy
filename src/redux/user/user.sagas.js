import {takeLatest, put} from 'redux-saga/effects'
import USER_ACTION_TYPES from "./user.types";
import {auth, googleProvider, createUserProfileDocument} from "../../firebase/firebase.utils";
import {all, call} from "redux-saga/effects";
import {signInSuccess, signInFailure} from "./user.actions";

function* getSnapshotFromUserAuth(user) {
    try {
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
    } catch (error) {
        put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        put(signInFailure(error));
    }
}

function* onGoogleSignInStart() {
    yield takeLatest(
        USER_ACTION_TYPES.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    )
}

function* signInWithEmail({payload: {email, password}}) {
    try {
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        put(signInFailure(error));
    }
}

function* onEmailSignInStart() {
    yield takeLatest(
        USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart)
    ])
}