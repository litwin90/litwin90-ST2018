import { 
    FETCH_LISTS_REQUEST,
    FETCH_LISTS_SUCCESS,
    FETCH_LISTS_FAILURE,

    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAILURE,

    CHANGE_NEW_LIST_VALUE,
    CHANGE_CURRENT_LIST,

    FETCH_ADD_LIST_FAILURE,
    FETCH_ADD_LIST_REQUEST,
    FETCH_ADD_LIST_SUCCESS,
    
    FETCH_EDIT_LIST_FAILURE,
    FETCH_EDIT_LIST_REQUEST,
    FETCH_EDIT_LIST_SUCCESS,
    
    FETCH_DELETE_LIST_FAILURE,
    FETCH_DELETE_LIST_REQUEST,
    FETCH_DELETE_LIST_SUCCESS,

    CHANGE_NEW_TODO_VALUE,
    CHANGE_CURRENT_TODO,

    FETCH_ADD_TODO_FAILURE,
    FETCH_ADD_TODO_REQUEST,
    FETCH_ADD_TODO_SUCCESS,
    
    FETCH_EDIT_TODO_FAILURE,
    FETCH_EDIT_TODO_REQUEST,
    FETCH_EDIT_TODO_SUCCESS,
    
    FETCH_DELETE_TODO_FAILURE,
    FETCH_DELETE_TODO_REQUEST,
    FETCH_DELETE_TODO_SUCCESS,

    TOOGLE_TODO_STATE_REQUEST,
    TOOGLE_TODO_STATE_SUCCESS,
    TOOGLE_TODO_STATE_FAILURE,
} from '../actions/actionTypes';

const accountData = {
    lists: [],
    currentList: undefined,
    todos: [],
    currentTodo: undefined,
    listsIsFetching: false,
    todosIsFetching: false,

    addListValue: "",
    addTodoValue: "",

    listIsSending: false,
    listIsUpdating: false,
    listIsRemoving: false,

    todoIsSending: false,
    todoIsUpdating: false,
    todoIsRemoving: false,
}

export default function data(state = accountData, action) {
    switch (action.type) {
        // GET LISTS
        case(FETCH_LISTS_REQUEST):
            return Object.assign({}, state, {
                listsIsFething: true,
            });
        case(FETCH_LISTS_SUCCESS):
            return Object.assign({}, state, {
                lists: action.payload,
                currentList: 0,
                listsIsFething: false,
            });
        case(FETCH_LISTS_FAILURE):
            return Object.assign({}, state, {
                listsIsFething: false,
                lists: [],
                currentList: undefined,
            });

        // GET TODOS
        case(FETCH_TODOS_REQUEST):
            return Object.assign({}, state, {
                todosIsFething: true,
            });
        case(FETCH_TODOS_SUCCESS):
            return Object.assign({}, state, {
                todos: action.payload,
                currentTodo: 0,
                todosIsFething: false,
            });
        case(FETCH_TODOS_FAILURE):
            return Object.assign({}, state, {
                todosIsFething: false,
                todos: [],
                currentTodo: undefined,
            });
        
        // ADD LIST
        case(FETCH_ADD_LIST_REQUEST):
            return Object.assign({}, state, {
                listIsSending: true,
            });
        case(FETCH_ADD_LIST_SUCCESS):
            return Object.assign({}, state, {
                listIsSending: false,
                addListValue: '',
            });
        case(FETCH_ADD_LIST_FAILURE):
            return Object.assign({}, state, {
                listIsSending: false,
                addListValue: '',
            });

        // ADD TODO
        case(FETCH_ADD_TODO_REQUEST):
            return Object.assign({}, state, {
                todoIsSending: true,
            });
        case(FETCH_ADD_TODO_SUCCESS):
            return Object.assign({}, state, {
                todoIsSending: false,
                addTodoValue: '',
            });
        case(FETCH_ADD_TODO_FAILURE):
            return Object.assign({}, state, {
                todoIsSending: false,
                addTodoValue: '',
            });

        case(CHANGE_NEW_LIST_VALUE):
            return Object.assign({}, state, {
                addListValue: action.payload,
            });
        
        case(CHANGE_CURRENT_LIST):
            return Object.assign({}, state, {
                currentList: action.payload,
            });

        case(CHANGE_NEW_TODO_VALUE):
            return Object.assign({}, state, {
                addTodoValue: action.payload,
            });
        
        case(CHANGE_CURRENT_TODO):
            return Object.assign({}, state, {
                currentTodo: action.payload,
            });

        // EDIT LIST
        case(FETCH_EDIT_LIST_REQUEST):
            return Object.assign({}, state, {
                listIsUpdating: true,
            });
        case(FETCH_EDIT_LIST_SUCCESS):
            return Object.assign({}, state, {
                listIsUpdating: false,
                addListValue: '',
            });
        case(FETCH_EDIT_LIST_FAILURE):
            return Object.assign({}, state, {
                listIsUpdating: false,
                addListValue: '',
            });
            

        // EDIT TODO
        case(FETCH_EDIT_TODO_REQUEST):
            return Object.assign({}, state, {
                todoIsUpdating: true,
            });
        case(FETCH_EDIT_TODO_SUCCESS):
            return Object.assign({}, state, {
                todoIsUpdating: false,
                addTodoValue: '',
            });
        case(FETCH_EDIT_TODO_FAILURE):
            return Object.assign({}, state, {
                todoIsUpdating: false,
                addTodoValue: '',
            });

        // TOGGLE TODO state
        case(TOOGLE_TODO_STATE_REQUEST):
            return Object.assign({}, state, {
                todoIsUpdating: true,
            });
        case(TOOGLE_TODO_STATE_SUCCESS):
            return Object.assign({}, state, {
                todoIsUpdating: false,
                addTodoValue: '',
            });
        case(TOOGLE_TODO_STATE_FAILURE):
            return Object.assign({}, state, {
                todoIsUpdating: false,
                addTodoValue: '',
            });

        // DELETE LIST
        case(FETCH_DELETE_LIST_REQUEST):
            return Object.assign({}, state, {
                listIsRemoving: true,
            });
        case(FETCH_DELETE_LIST_SUCCESS):
            return Object.assign({}, state, {
                listIsRemoving: false,
                addListValue: '',
            });
        case(FETCH_DELETE_LIST_FAILURE):
            return Object.assign({}, state, {
                listIsRemoving: false,
                addListValue: '',
            });

        // DELETE TODO
        case(FETCH_DELETE_TODO_REQUEST):
            return Object.assign({}, state, {
                todoIsRemoving: true,
            });
        case(FETCH_DELETE_TODO_SUCCESS):
            return Object.assign({}, state, {
                todoIsRemoving: false,
                addTodoValue: '',
            });
        case(FETCH_DELETE_TODO_FAILURE):
            return Object.assign({}, state, {
                todoIsRemoving: false,
                addTodoValue: '',
            });
        default:
            return state;
    }
}
