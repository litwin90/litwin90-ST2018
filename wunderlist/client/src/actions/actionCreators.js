import * as actionTypes from './actionTypes';
import config from '../config';
import asyncPost from './helpers/asyncPost';
import asyncGet from './helpers/asyncGet';
import asyncPut from './helpers/asyncPut';
import asyncDelete from './helpers/asyncDelete';

const { server, port, signIn, signOut, signUp } = config;

export function actionCreator(type, payload) {
    return { type, payload };
}

export function toggleTodoState(listId, todoId, complited) {
    const configuration = {
        url: server + port + config.getLists + `/${listId}` + config.getTodos + `/${todoId}`,
        data: { complited },
        success: actionTypes.TOOGLE_TODO_STATE_SUCCESS,
        failure: actionTypes.TOOGLE_TODO_STATE_FAILURE,
        action: actionTypes.TOOGLE_TODO_STATE_REQUEST,
    }
    return asyncPut(configuration, actionCreator);
}

export function register(userName, password1, password2) {
    const configuration = {
        url: server + port + signUp,
        data: { username: userName, password: password1, passwordRepeat: password2 },
        success: actionTypes.FETCH_REGISTER_SUCCESS,
        failure: actionTypes.FETCH_REGISTER_FAILURE,
        action: actionTypes.FETCH_REGISTER_REQUEST,
    };
    return asyncPost(configuration, actionCreator);
}

export function login(userName, psw) {
    const configuration = {
        url: server + port + signIn,
        data: { username: userName, password: psw },
        success: actionTypes.FETCH_LOGIN_SUCCESS,
        failure: actionTypes.FETCH_LOGIN_FAILURE,
        action: actionTypes.FETCH_LOGIN_REQUEST,
    };
    return asyncPost(configuration, actionCreator);
}

export function logOut() {
    const configuration = {
        url: server + port + signOut,
        success: actionTypes.FETCH_LOGOUT_SUCCESS,
        failure: actionTypes.FETCH_LOGOUT_FAILURE,
        prop: 'isLogOuted',
        action: actionTypes.FETCH_LOGOUT_REQUEST,
    };
    return asyncGet(configuration, actionCreator);
}

export function getSession() {
    const configuration = {
        url: server + port + config.getSession,
        success: actionTypes.FETCH_SESSION_SUCCESS,
        failure: actionTypes.FETCH_SESSION_FAILURE,
        prop: 'username',
        action: actionTypes.FETCH_SESSION_REQUEST,
    };
    return asyncGet(configuration, actionCreator);
}

export function getLists() {
    const configuration = {
        url: server + port + config.getLists,
        success: actionTypes.FETCH_LISTS_SUCCESS,
        failure: actionTypes.FETCH_LISTS_FAILURE,
        action: actionTypes.FETCH_LISTS_REQUEST,
        prop: 'length',
    };
    return asyncGet(configuration, actionCreator);
}

export function addList(listName) {
    const configuration = {
        url: server + port + config.addList,
        data: { name: listName },
        success: actionTypes.FETCH_ADD_LIST_SUCCESS,
        failure: actionTypes.FETCH_ADD_LIST_FAILURE,
        action: actionTypes.FETCH_ADD_LIST_REQUEST,
    }
    return asyncPost(configuration, actionCreator);
}

export function editList(listName, id) {
    const configuration = {
        url: server + port + config.editList + `/${id}`,
        data: { name: listName },
        success: actionTypes.FETCH_EDIT_LIST_SUCCESS,
        failure: actionTypes.FETCH_EDIT_LIST_FAILURE,
        action: actionTypes.FETCH_EDIT_LIST_REQUEST,
    }
    return asyncPut(configuration, actionCreator);
}

export function deleteList(id) {
    const configuration = {
        url: server + port + config.deleteList + `/${id}`,
        success: actionTypes.FETCH_DELETE_LIST_SUCCESS,
        failure: actionTypes.FETCH_DELETE_LIST_FAILURE,
        action: actionTypes.FETCH_DELETE_LIST_REQUEST,
    }
    return asyncDelete(configuration, actionCreator);
}


export function getTodos(listId) {
    const configuration = {
        url: server + port + config.getLists + `/${listId}` + config.getTodos ,
        success: actionTypes.FETCH_TODOS_SUCCESS,
        failure: actionTypes.FETCH_TODOS_FAILURE,
        action: actionTypes.FETCH_TODOS_REQUEST,
        prop: 'length',
    };
    return asyncGet(configuration, actionCreator);
}

export function addTodo(listId, content) {
    const configuration = {
        url: server + port + config.getLists + `/${listId}` + config.getTodos,
        data: { content },
        success: actionTypes.FETCH_ADD_TODO_SUCCESS,
        failure: actionTypes.FETCH_ADD_TODO_FAILURE,
        action: actionTypes.FETCH_ADD_TODO_REQUEST,
    }
    return asyncPost(configuration, actionCreator);
}

export function editTodo(listId, todoId, content) {
    const configuration = {
        url: server + port + config.getLists + `/${listId}` + config.getTodos + `/${todoId}`,
        data: { content },
        success: actionTypes.FETCH_EDIT_TODO_SUCCESS,
        failure: actionTypes.FETCH_EDIT_TODO_FAILURE,
        action: actionTypes.FETCH_EDIT_TODO_REQUEST,
    }
    return asyncPut(configuration, actionCreator);
}

export function deleteTodo(listId, todoId) {
    const configuration = {
        url: server + port + config.getLists + `/${listId}` + config.getTodos + `/${todoId}`,
        success: actionTypes.FETCH_DELETE_TODO_SUCCESS,
        failure: actionTypes.FETCH_DELETE_TODO_FAILURE,
        action: actionTypes.FETCH_DELETE_TODO_REQUEST,
    }
    return asyncDelete(configuration, actionCreator);
}
