import {takeLatest, put} from 'redux-saga/effects'
import UserActionType from "./user.types";
import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from "../../firebase/firebase.utils";
import {all, call} from "redux-saga/effects";
import {signInSuccess, signInFailure, signOutSuccess, signOutFailure} from "./user.actions";

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
        UserActionType.GOOGLE_SIGN_IN_START,
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
        UserActionType.EMAIL_SIGN_IN_START,
        signInWithEmail
    )
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (userAuth) {
            yield getSnapshotFromUserAuth(userAuth);
        } else {

        }
    } catch (error) {
        yield put(signInFailure(error))
    }
}

function* onCheckUserSession() {
    yield takeLatest(
        UserActionType.CHECK_USER_SESSION,
        isUserAuthenticated
    )
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

function* onSignOutStart() {
    yield takeLatest(
        UserActionType.SIGN_OUT_START,
        signOut
    );
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ])
}