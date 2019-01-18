import NetworkService from './NetworkService';

export default function asyncPut({ url, data, success, failure, action }, actionCreator) {
    return function(dispatch) {
        dispatch(actionCreator(action));
        const configuration = { dispatch, url, data, success, failure }
        return NetworkService.put(configuration);
    }
}
