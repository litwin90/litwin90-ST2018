import React from 'react';
import { render } from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import mainReducer from './reducers/mainReducer';
import './css/index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    mainReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister();

export default store;
