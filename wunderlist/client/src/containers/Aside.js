import React, { Component } from 'react';
import Control from '../components/Control';
import FaElement from '../components/FaElement.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions/actionCreators';
import {
    CHANGE_NEW_LIST_VALUE,
    CHANGE_CURRENT_LIST,
} from '../actions/actionTypes';
import Modal from '../components/Modal';
import Input from '../components/Input';

class Aside extends Component {
    state = { 
        showAddListModal: false,
        showEditListModal: false,
    }
    render() {
        const { lists } = this.props;
        return (
            <aside className="aside">
                {this.renderLists(lists)}

                <Control className="aside-add-new-list" value="Add list" onClick={this.showModalAddList}/>
                <Modal show={this.state.showAddListModal} handleClose={this.hideModalAddList}>
                    <h1>Add list</h1>
                    <Input 
                        type="text"
                        plaseHolder="Enter list name"
                        onChange={this.changeAddedListValue}
                    />
                    <Control 
                        className="submit-add-list"
                        onClick={this.addNewList}
                        value="Add"
                    />
                </Modal>

                <Modal show={this.state.showEditListModal} handleClose={this.hideModalEditList}>
                    <h1>Edit list</h1>
                    <Input 
                        type="text"
                        plaseHolder="Enter new list name"
                        onChange={this.changeAddedListValue}
                    />
                    <Control 
                        className="submit-add-list"
                        onClick={this.editList}
                        value="Edit"
                    />
                    <Control 
                        className="remove-list"
                        onClick={this.removeList}
                        value="Remove list"
                    />
                </Modal>
            </aside>
        );
    }

    componentDidMount = async () => {
        const { getLists, getTodos } = this.props.pageActions;
        await getLists();
        const { lists, currentList } = this.props;
        if (currentList !== undefined) {
            const currentListId = lists[currentList]._id;
            getTodos(currentListId);
        }
    }

    changeAddedListValue = (e) => {
        const { actionCreator } = this.props.pageActions;
        actionCreator(CHANGE_NEW_LIST_VALUE, e.target.value);
    }

    addNewList = async (e) => {
        e.target.parentNode.children[1].children[1].value = '';
        const { addListValue } = this.props;
        const { addList } = this.props.pageActions;
        this.hideModalAddList();
        await addList(addListValue);
        await this.componentDidMount();
    }

    // addNewTodo = async (e) => {
    //     e.target.parentNode.children[1].children[1].value = '';
    //     const { addTodoValue, todos, currentTodo } = this.props;
    //     const { addTodo } = this.props.pageActions;
    //     const id = todos[currentTodo]._id;
    //     this.hideModalAddList();
    //     await addTodo(id, addTodoValue);
    //     await this.componentDidMount();
    // }

    editList = async (e) => {
        e.target.parentNode.children[1].children[1].value = '';
        const { addListValue, lists, currentList } = this.props;
        const id = lists[currentList]._id;
        const { editList } = this.props.pageActions;
        this.hideModalEditList();
        await editList(addListValue, id);
        await this.componentDidMount();
    }

    removeList = async (e) => {
        e.target.parentNode.children[1].children[1].value = '';
        const { lists, currentList } = this.props;
        const id = lists[currentList]._id;
        const { deleteList } = this.props.pageActions;
        this.hideModalEditList();
        await deleteList(id);
        await this.componentDidMount();
    }

    renderLists = (lists) => {
        const listComponents = [];
        const { currentList } = this.props;

        lists.forEach((list, index) => {
            const className = (currentList === index) ? 'aside-button active' : 'aside-button';
            listComponents.push(
                <Control 
                    className={className}
                    value={list.name}
                    innerElement={
                        <FaElement
                            className="edit-list"
                            faClassName="fa fa-pencil"
                            onClick={this.showModalEditList}
                        />}
                    key={index}
                    onClick={this.changeActiveList.bind(this, index)}
                />
            )
        })
        return listComponents;
    }

    changeActiveList(index) {
        const { actionCreator, getTodos } = this.props.pageActions;
        actionCreator(CHANGE_CURRENT_LIST , index);
        const { lists } = this.props;
        const currentListId = lists[index]._id;
        getTodos(currentListId);
    }

    showModalAddList = () => {
        this.setState({ showAddListModal: true });
    }

    hideModalAddList = () => {
        this.setState({ showAddListModal: false });
    }

    showModalEditList = () => {
        this.setState({ showEditListModal: true });
    }

    hideModalEditList = () => {
        this.setState({ showEditListModal: false });
    }
}

const mapStateToProps = (state) => {
    return {
        lists: state.currentAccount.lists,
        currentList: state.currentAccount.currentList,
        listsIsFetching: state.currentAccount.listsIsFetching,
        todosIsFetching: state.currentAccount.todosIsFetching,
        addListValue: state.currentAccount.addListValue,
    }
}

const mapActionsToProp = (dispatch) => {
    return {
        pageActions: bindActionCreators(actions, dispatch)
    }
}

Aside = connect(mapStateToProps, mapActionsToProp)(Aside);

export default Aside;
