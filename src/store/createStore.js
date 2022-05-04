import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import rootReducer from '../reducers';

const middleware = [];

if (process.env.NODE_ENV === 'development') {
    middleware.push(logger);
}

const createStore = (preloadedState = {}) => {
    const store = configureStore({
        preloadedState,
        reducer: rootReducer,
        devTools: false,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
    });

    if (module.hot) {
        module.hot.accept(() => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
};

export default createStore;
