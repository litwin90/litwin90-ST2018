import NetworkService from './NetworkService';

export default function asyncPost({ url, data, success, failure, action }, actionCreator) {
    return function(dispatch) {
        dispatch(actionCreator(action));
        const configuration = { dispatch, url, data, success, failure }
        return NetworkService.post(configuration);
    }
}
