// const debug = require('debug')('app:authController');
// const passport = require('passport');
// const mongoose = require('mongoose');
// const chalk = require('chalk');
// const Account = require('../config/models/account');

function apiController() {
    function accountMiddleWare(req, res) {
        return res;
    }
    function createAccount(req, res) {
        return res;
    }
    function getAccount(req, res) {
        return res;
    }
    function updateAccount(req, res) {
        return res;
    }
    function deleteAccount(req, res) {
        return res;
    }
    function listsMiddleWare(req, res) {
        return res;
    }
    function createList(req, res) {
        return res;
    }
    function getLists(req, res) {
        return res;
    }
    function getListById(req, res) {
        return res;
    }
    function updateListById(req, res) {
        return res;
    }
    function deleteListBuId(req, res) {
        return res;
    }
    function createTodos(req, res) {
        return res;
    }
    function getTodos(req, res) {
        return res;
    }
    function getTodoById(req, res) {
        return res;
    }
    function changeTodoById(req, res) {
        return res;
    }
    function deleteTodoById(req, res) {
        return res;
    }
    return {
        accountMiddleWare,
        createAccount,
        getAccount,
        updateAccount,
        deleteAccount,
        listsMiddleWare,
        createList,
        getLists,
        getListById,
        updateListById,
        deleteListBuId,
        createTodos,
        getTodos,
        getTodoById,
        changeTodoById,
        deleteTodoById,
    };
}

module.exports = apiController;
