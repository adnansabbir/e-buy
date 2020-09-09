import {createStore, applyMiddleware} from "redux";
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import {persistStore} from "redux-persist";
import createSagaMiddlewares from 'redux-saga';
import rootSage from "./root-saga";

const sagaMiddleware = createSagaMiddlewares();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSage);

const persistor = persistStore(store);

export {store, persistor};