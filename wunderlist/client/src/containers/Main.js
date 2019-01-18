import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aside from './Aside';
import Input from '../components/Input';
import Todo from '../components/Todo';
import FaElement from '../components/FaElement';
import Control from '../components/Control';
import * as actions from '../actions/actionCreators';
import { CHANGE_NEW_TODO_VALUE } from '../actions/actionTypes';
import Modal from '../components/Modal';

class Main extends Component {
    state = {
        showEditTodoModal: false,
        editedTodo: undefined,
    }
    render() {
        const { todos } = this.props;
        return (
            <main>
                <Aside/>
                <Input
                    className="add-todo"
                    plaseHolder="Add todo"
                    onChange={this.changeCurrentInputs}
                />
                <Control 
                    className="add-todo"
                    onClick={this.addTodo}
                    value="Add todo"
                />
                {this.renderTodo(todos)}
                <Modal show={this.state.showEditTodoModal} handleClose={this.hideModalEditTodo}>
                    <h1>Edit todo</h1>
                    <Input 
                        type="text"
                        plaseHolder="Enter new todo name"
                        onChange={this.changeAddedTodoValue}
                    />
                    <Control 
                        className="submit-edit-todo"
                        onClick={this.editTodo}
                        value="Edit"
                    />
                    <Control 
                        className="remove-todo"
                        onClick={this.removeTodo}
                        value="Remove todo"
                    />
                </Modal>
            </main>
        );
    }
    removeTodo = async (e) => {  
        e.target.parentNode.children[1].children[1].value = '';
        const { addTodoValue, lists, currentList } = this.props;
        const todoId = this.state.editedTodo;
        const listId = lists[currentList]._id;
        const { deleteTodo, getTodos } = this.props.pageActions;
        this.hideModalEditTodo();
        await deleteTodo(listId, todoId, addTodoValue);
        getTodos(listId);
    }

    editTodo = async (e) => {
        e.target.parentNode.children[1].children[1].value = '';
        const { addTodoValue, lists, currentList } = this.props;
        const todoId = this.state.editedTodo;
        const listId = lists[currentList]._id;
        const { editTodo, getTodos } = this.props.pageActions;
        this.hideModalEditTodo();
        await editTodo(listId, todoId, addTodoValue);
        getTodos(listId);
    }

    changeAddedTodoValue = (e) => {
        const { actionCreator } = this.props.pageActions;
        actionCreator(CHANGE_NEW_TODO_VALUE, e.target.value);
    }

    showModalEditTodo = (index) => {
        this.setState({ 
            showEditTodoModal: true,
            editedTodo: index,
        });
    }

    hideModalEditTodo = () => {
        this.setState({ 
            showEditTodoModal: false,
            editedTodo: undefined,
        });
    }

    changeCurrentInputs = (e) => {
        const { actionCreator } = this.props.pageActions;
        actionCreator(CHANGE_NEW_TODO_VALUE, e.target.value);
    }

    renderTodo = (todos) => {
        const result = [];
        todos.forEach((todo, index) => {
            result.push(
            <Todo 
                className={todo.complited ? "todo complited" : "todo"}
                content={todo.content}
                key={index}
                onClick={this.toggleTodoComplited.bind(this, todo)}
                innerElement={
                    <FaElement 
                        className="edit-todo"
                        faClassName="fa fa-pencil"
                        onClick={this.showModalEditTodo.bind(this, todo._id)}
                    />}
            />);
        });
        return result;
    }

    toggleTodoComplited = async (todo) => {
        const { toggleTodoState, getTodos } = this.props.pageActions;
        const { currentList, lists} = this.props;
        const listId = lists[currentList]._id;
        await toggleTodoState(listId, todo._id, !todo.complited);
        getTodos(listId);
    }

    addTodo = async (e) => {
        e.target.parentNode.children[1].children[1].value = '';
        const { addTodoValue, lists, currentList } = this.props;
        const { addTodo, actionCreator, getTodos } = this.props.pageActions;
        if (lists.length > 0) {
            const listId = lists[currentList]._id;
            await addTodo(listId, addTodoValue);
            actionCreator(CHANGE_NEW_TODO_VALUE, '');
            getTodos(listId);
        }
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.currentAccount.lists,
        currentList: state.currentAccount.currentList,
        listsIsFetching: state.currentAccount.listsIsFetching,

        todos: state.currentAccount.todos,
        currentTodo: state.currentAccount.currentTodo,
        todosIsFetching: state.currentAccount.todosIsFetching,
        addTodoValue: state.currentAccount.addTodoValue,
    }
}

const mapActionsToProp = (dispatch) => {
    return {
        pageActions: bindActionCreators(actions, dispatch)
    }
}

Main = connect(mapStateToProps, mapActionsToProp)(Main);

export default Main;
