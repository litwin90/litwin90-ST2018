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
        credentials: 'include',
    })
        .then(response => response.json())
        .then(response => {
            if (response.username) {
                dispatch(actionCreator(success, response))
            } else {
                dispatch(actionCreator(failure, response));
            }
        })
        .catch(error => console.log(error.message));
}

NetworkService.put = ({ dispatch, url, data, success, failure }) => {
    return fetch(url, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    })
        .then(response => response.json())
        .then(response => {
            dispatch(actionCreator(success, response));
        })
        .catch(error => {
            dispatch(actionCreator(failure));
        });
}

NetworkService.delete = ({ dispatch, url, success, failure }) => {
    return fetch(url, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
        .then(response => response.json())
        .then(response => {
            dispatch(actionCreator(success, response));
        })
        .catch(error => {
            dispatch(actionCreator(failure));
        });
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
        })
        .catch(error => console.log(error.message));
}
