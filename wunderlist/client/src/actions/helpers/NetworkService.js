import fetch from 'isomorphic-fetch';
import { actionCreator } from '../actionCreators';


export default class NetworkService {}
NetworkService.post = ({ dispatch, url, data, success, failure }) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(response => {
            if (response.username) {
                dispatch(actionCreator(success, response))
            } else {
                dispatch(actionCreator(failure, response));
            }
        })
}

NetworkService.get = ({ dispatch, url, success, failure, prop , fetchConfig }) => {
    return fetch(url, fetchConfig)
        .then(response => response.json())
        .then(response => {
            if (response[prop]) {
                dispatch(actionCreator(success, response));
            } else {
                dispatch(actionCreator(failure, response));
            }
        });
}
