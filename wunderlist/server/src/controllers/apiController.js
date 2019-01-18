/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const debug = require('debug')('app:apiController');
const passport = require('passport');
const Account = require('../config/models/account');
const List = require('../config/models/list');
const Todo = require('../config/models/todo');
const privateFields = require('../config/models/privateFields');

const {
    OK,
    CREATED,
    BAD_REQUEST,
    FORBIDDEN,
    CONFLICT,
    INTERNAL_SERVER_ERROR,
} = require('./statusCodes');

function apiController() {
    function accountMiddleWare(req, res, next) {
        res.set(
            {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
        );
        if (!req.user) {
            return res.status(FORBIDDEN).send('User is not logged in');
        }
        next();
    }
    function listMiddleWare(req, res, next) {
        res.set(
            {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
        );
        if (!req.user) {
            return res.status(FORBIDDEN).send('User is not logged in');
        }
        // check if current user have requested list:
        let currentListId;
        if (!req.params.id) {
            currentListId = req.params.listId;
        } else {
            currentListId = req.params.id;
        }

        Account.findOne({ _id: req.user._id, lists: { $in: currentListId } }, (err, account) => {
            if (err) {
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            if (!account) {
                return res.status(FORBIDDEN).send('you have not permissions for requested list');
            }
            next();
        });
    }
    function todoMiddleWare(req, res, next) {
        if (!req.user) {
            return res.status(FORBIDDEN).send('User is not logged in');
        }
        // check if current user has requested list:
        const currentListId = req.params.listId;
        Account.findOne({ _id: req.user._id, lists: { $in: currentListId } }, (err, account) => {
            if (err) {
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            if (!account) {
                return res.status(FORBIDDEN).send('you have not permissions for requested list');
            }

            // check if requested list has requested todo:
            const currentTodoId = req.params.id;
            List.findOne({ _id: currentListId, todos: { $in: currentTodoId } }, (err, list) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                if (!list) {
                    return res.status(FORBIDDEN).send('you have not permissions for requested list');
                }
                next();
            });
        });
    }
    function createAccount(req, res) {
        const { username, password, passwordRepeat } = req.body;

        if (password !== passwordRepeat) {
            return res.status(BAD_REQUEST).send('Passwords not match');
        }

        Account.register({ username, password }, passwordRepeat, (error) => {
            if (error) {
                if (error.name === 'UserExistsError') {
                    return res.status(CONFLICT).send(error.message);
                }
                if (error.name === 'ValidationError') {
                    return res.status(BAD_REQUEST).send(error.message);
                }
                return res.status(INTERNAL_SERVER_ERROR).send(error.message);
            }
            passport.authenticate('local')(req, res, (err) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                return res.status(CREATED).json({ status: 'OK' });
            });
        });
    }
    function getAccount(req, res) {
        return res.status(OK).json(req.user);
    }
    function updateAccount(req, res) {
        // check if user try to modify private fields like _id, hash ... :
        if (privateFields.some(field => Object.prototype.hasOwnProperty.call(req.body, field))) {
            return res.status(FORBIDDEN).send('you try to update forbidden fields');
        }

        Account.findOne({ _id: req.user._id }, (err, account) => {
            if (err) {
                return res.status(BAD_REQUEST).json({ error: err.message });
            }
            account.update(req.body, { runValidators: true }, (err) => {
                if (err) {
                    return res.status(BAD_REQUEST).json({ error: err.message });
                }
                return res.status(OK).json({ status: 'OK' });
            });
        });
    }
    function deleteAccount(req, res) {
        Account.findById(req.user._id, (err, account) => {
            if (err) {
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            account.remove((err) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                return res.status(OK).json({ status: 'OK' });
            });
        });
    }
    function createList(req, res) {
        res.set(
            {
                'Access-Control-Allow-Origin': 'http://localhost:3000',
                'Access-Control-Allow-Credentials': true,
            },
        );
        List.create({
            accounts: req.user._id,
            name: req.body.name,
        }, (err) => {
            if (err) {
                if (err.code === 11000) {
                    return res.status(CONFLICT).json({ error: err.message });
                }
                return res.status(BAD_REQUEST).json({ error: err.message });
            }
            return res.status(CREATED).json({ username: req.user.username });
        });
    }
    function getLists(req, res) {
        Account.findOne({ _id: req.user._id })
            .populate('lists')
            .exec((err, account) => {
                if (err) {
                    res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                res.status(OK).json(account.lists);
            });
    }
    function getListById(req, res) {
        Account.findOne({ _id: req.user._id })
            .populate({
                path: 'lists',
                match: { _id: req.params.id },
            })
            .exec((err, account) => {
                if (err) {
                    return res.status(BAD_REQUEST).json({ error: err.message });
                }
                return res.status(OK).json(account.lists[0]);
            });
    }
    function updateListById(req, res) {
        // check if user try to modify private fields like _id, hash ... :
        if (privateFields.some(field => Object.prototype.hasOwnProperty.call(req.body, field))) {
            return res.status(FORBIDDEN).send('you try to update forbidden fields');
        }

        Account.findOne({ _id: req.user._id })
            .populate({
                path: 'lists',
                match: { _id: req.params.id },
            })
            .exec((err, account) => {
                if (err) {
                    return res.status(BAD_REQUEST).json({ error: err.message });
                }
                const list = account.lists[0];

                list.update(req.body, { runValidators: true }, (err) => {
                    if (err) {
                        if (err.code === 'E11000') {
                            return res.status(CONFLICT).json({ error: err.message });
                        }
                        return res.status(BAD_REQUEST).json({ error: err.message });
                    }
                    return res.status(OK).json({ status: 'OK' });
                });
            });
    }
    function deleteListBuId(req, res) {
        List.findById(req.params.id, (err, list) => {
            if (err) {
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            list.remove((err) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                return res.status(OK).json({ status: 'OK' });
            });
        });
    }
    function createTodos(req, res) {
        const { content } = req.body;
        new Todo({ content, list: req.params.listId }).save((err) => {
            if (err) {
                debug(err.message);
                if (err.code === 11000) {
                    return res.status(CONFLICT).json({ error: err.message });
                }
                return res.status(BAD_REQUEST).json({ error: err.message });
            }
            return res.status(CREATED).json({ username: req.user.username });
        });
    }
    function getTodos(req, res) {
        List.findById(req.params.listId)
            .populate('todos')
            .exec((err, list) => {
                if (err) {
                    debug(err.message);
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                return res.status(OK).json(list.todos);
            });
    }
    function getTodoById(req, res) {
        Todo.findById(req.params.id, (err, todo) => {
            if (err) {
                debug(err.message);
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            return res.status(OK).json(todo);
        });
    }
    function changeTodoById(req, res) {
        // check if user try to modify private fields like _id, hash ... :
        if (privateFields.some(field => Object.prototype.hasOwnProperty.call(req.body, field))) {
            return res.status(FORBIDDEN).send('you try to update forbidden fields');
        }

        Todo.findById(req.params.id, (err, todo) => {
            if (err) {
                debug(err.message);
                return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
            todo.update(req.body, (err) => {
                if (err) {
                    debug(err.message);
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
                return res.status(OK).send('updated');
            });
        });
    }
    function deleteTodoById(req, res) {
        Todo.findById(req.params.id)
            .exec((err, todo) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                }

                todo.remove((err) => {
                    if (err) {
                        return res.status(INTERNAL_SERVER_ERROR).json({ error: err.message });
                    }
                    return res.status(OK).send('updated');
                });
            });
    }
    return {
        accountMiddleWare,
        listMiddleWare,
        todoMiddleWare,
        createAccount,
        getAccount,
        updateAccount,
        deleteAccount,
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
