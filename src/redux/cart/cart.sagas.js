import {all, call, takeLatest, put} from 'redux-saga/effects';
import UserActionType from "../user/user.types";
import {clearCart} from "./cart.actions";

function* clearCartOnSignOut() {
    yield put(clearCart())
}

function* onSignOutSuccess() {
    yield takeLatest(UserActionType.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
    yield (
        all([
            call(onSignOutSuccess)
        ]));
}