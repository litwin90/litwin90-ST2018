const debug = require('debug')('app:apiController');
const passport = require('passport');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Account = require('../config/models/account');
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
        if (req.user) {
            next();
        } else {
            res.status(FORBIDDEN).send('User is not logged in');
        }
    }
    function createAccount(req, res) {
        const { username, password, passwordRepeat } = req.body;

        // validation of passports matching
        const passportsMatchs = password === passwordRepeat;
        const passwordPassed = password !== undefined;

        if (!passwordPassed) {
            debug(chalk.red('Password not passed'));
            res.status(BAD_REQUEST).send('Please enter password');
        } else if (!passportsMatchs) {
            debug(chalk.red('Passwords not match'));
            res.status(BAD_REQUEST).send('Passwords not match');
        } else {
            const col = mongoose.model('Account');

            const accaunt = new Account({ username, password });
            // validate according to the model
            const validationError = accaunt.validateSync();
            if (!validationError) {
                debug('validation passed');
                Account.register(
                    { username, password },
                    passwordRepeat,
                    (err) => {
                        if (err) {
                            debug('err with registration');
                            col.findOne({ username }, (error) => {
                                if (error) {
                                    debug('cannot create accaunt');
                                    res.status(BAD_REQUEST).send('Can not to create an accaunt');
                                } else {
                                    debug(chalk.red(`user ${chalk.green(username)} insist`));
                                    req.session.errMess = `User ${username} insist`;
                                    res.status(CONFLICT).send(`User ${username} already insist`);
                                }
                            });
                        } else {
                            debug('accaunt sucsessfully registred');

                            passport.authenticate('local')(req, res, () => {
                                debug('sign up sucsessfully');
                                res.status(CREATED).send('Sign up successfully');
                            });
                        }
                    },
                );
            } else {
                debug('validation fails');
                if (validationError.errors.username) {
                    debug(chalk.red(validationError.errors.username.message));
                    return res.status(BAD_REQUEST).send(validationError.errors.username.message);
                }
                if (validationError.errors.password) {
                    debug(chalk.red(validationError.errors.password.message));
                    return res.status(BAD_REQUEST).send(validationError.errors.password.message);
                }
            }
        }
        return { username, password };
    }
    function getAccount(req, res) {
        const {
            username,
            lists,
            _id,
            emails,
        } = req.user;
        return res.status(OK).json({
            username,
            lists,
            _id,
            emails,
        });
    }
    function updateAccount(req, res) {
        // eslint-disable-next-line no-underscore-dangle
        const query = { _id: req.user._id };
        const update = req.body;
        const options = { runValidators: true };
        const cb = (err) => {
            if (err) {
                debug(err.message);
                return res.status(INTERNAL_SERVER_ERROR).send(err.message);
            }
            debug('user updated');
            return res.status(OK).send('user updated');
        };

        // check request for update:
        const idInRequest = Object.prototype.hasOwnProperty.call(update, '_id');
        const hashInRequest = Object.prototype.hasOwnProperty.call(update, 'hash');
        const saltInRequest = Object.prototype.hasOwnProperty.call(update, 'salt');

        const requestIsCorrect = !idInRequest && !hashInRequest && !saltInRequest;
        if (!requestIsCorrect) {
            return res.status().send('you try to update forbidden fields');
        }

        Account.findOneAndUpdate(query, update, options, cb);
        return undefined;
    }
    function deleteAccount(req, res) {
        // eslint-disable-next-line no-underscore-dangle
        const query = { _id: req.user._id };
        const cb = (err) => {
            if (err) {
                debug(err.message);
                return res.status(INTERNAL_SERVER_ERROR).send(err.message);
            }
            debug('user removed');
            return res.status(OK).send('user removed');
        };

        Account.findOneAndRemove(query, cb);
        return undefined;
    }
    function listsMiddleWare(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function createList(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function getLists(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function getListById(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function updateListById(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function deleteListBuId(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function createTodos(req, res) {
        return res;
    }
    function getTodos(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function getTodoById(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function changeTodoById(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
    }
    function deleteTodoById(req, res) {
        return res.send(JSON.stringify({ content: 'hello' }));
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
