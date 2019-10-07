import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { serviceMiddleware } from './MiddlewareManager';
import loadServices from './services/index.service';

// load services
loadServices();

// define compose func to support redux development tools
const composeFunc = () => {
    return process.env.NODE_ENV === 'production'
        ? compose
        : (() => {
            const { composeWithDevTools } = require('redux-devtools-extension');
            return composeWithDevTools;
        })();
}

// define middleware
const middleware = [
    thunk,
    serviceMiddleware,
].map(mw => applyMiddleware(mw));

// compose all middleware together
const composedMiddleware = composeFunc().apply(null, middleware);

// instantiate store object with root reducer, default state, and composed middlewares
const store = createStore(rootReducer, {}, composedMiddleware);

export default store;
