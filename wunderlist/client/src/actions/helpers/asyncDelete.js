import NetworkService from './NetworkService';

export default function asyncDelete({ url, success, failure, action }, actionCreator) {
    return function(dispatch) {
        dispatch(actionCreator(action));
        const configuration = { dispatch, url, success, failure }
        return NetworkService.delete(configuration);
    }
}
