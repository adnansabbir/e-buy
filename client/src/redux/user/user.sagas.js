import {all, call, put, takeLatest} from 'redux-saga/effects'
import UserActionType from "./user.types";
import {auth, createUserProfileDocument, getCurrentUser, googleProvider} from "../../firebase/firebase.utils";
import {
    signInFailure,
    signInSuccess,
    signOutFailure,
    signOutSuccess,
    signUpFailure,
    signUpSuccess
} from "./user.actions";

function* getSnapshotFromUserAuth(user, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, user, additionalData);
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

function* signUp({payload: {email, password, ...additionalData}}) {
    try {
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user: user, additionalData: {...additionalData}}))
    } catch (error) {
        yield put(signUpFailure(error))
    }
}

function* onSignUpStart() {
    yield takeLatest(UserActionType.SIGN_UP_START, signUp);
}

function* signInAfterSignUp({payload: {user, additionalData}}) {
    yield call(getSnapshotFromUserAuth, user, additionalData);
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionType.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export default function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}
