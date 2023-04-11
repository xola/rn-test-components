import React, { Component } from 'react';
import { Provider } from 'react-redux';
import xolaApi from '../api/xolaApi';
import App from './App';
import createStore from '../store/createStore';

const store = createStore();
xolaApi.setStore(store);

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Root;
