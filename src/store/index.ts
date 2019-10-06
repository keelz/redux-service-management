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

// third-party enhancers
const libEnhancers = [
    thunk,
].map(mw => applyMiddleware(mw));

// load services
loadServices();

// custom middleware action handlers
const actionHandlers = applyMiddleware((api: MiddlewareAPI) => (next: Dispatch) => (action: IActionType<any>) => {
    next(action);
    middlewareServiceManager.execute(api)(action);
});

const composedEnhancers = composeFunc().apply(null, [...libEnhancers, actionHandlers]);

const store = createStore(rootReducer, {}, composedEnhancers);

export default store;
