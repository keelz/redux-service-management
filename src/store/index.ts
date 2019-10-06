import { applyMiddleware, createStore, compose, MiddlewareAPI, Dispatch } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { IActionType } from './types';
import middlewareServiceManager from './MiddlewareManager';
import loadServices from './services/index.service';

export const composeFunc = () => {
    return process.env.NODE_ENV === 'production'
        ? compose
        : (() => {
            const { composeWithDevTools } = require('redux-devtools-extension');
            return composeWithDevTools;
        })();
}

// load middleware services
loadServices();

// third-party enhancers
const libEnhancers = [
    thunk,
].map(mw => applyMiddleware(mw));

// custom enhancers
const customEnhancers = [
    (api: MiddlewareAPI) =>
    (next: Dispatch) =>
    (action: IActionType<any>) => {
        // push the action through the redux pipe
        next(action);
        // non-blocking asynchronous call to middleware service
        middlewareServiceManager.execute(api)(action);
    }
].map(mw => applyMiddleware(mw));

const composedEnhancers = composeFunc().apply(null, [...libEnhancers, ...customEnhancers]);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
