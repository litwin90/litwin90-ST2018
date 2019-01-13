import NetworkService from './NetworkService';

export default function asyncGet({ url, success, failure, prop, action}, actionCreator) {
    const fetchConfig = { credentials: 'include' };
    return function(dispatch) {
        dispatch(actionCreator(action));
        const configuration = { dispatch, url, success, failure, prop, fetchConfig }
        return NetworkService.get(configuration);
    }
}
