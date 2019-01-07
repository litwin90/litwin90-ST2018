/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const debug = require('debug')('app:apiController');
const passport = require('passport');
const mongoose = require('mongoose');
const chalk = require('chalk');
const Account = require('../config/models/account');
const List = require('../config/models/list');
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
        if (req.user) {
            next();
        } else {
            res.status(FORBIDDEN).send('User is not logged in');
        }
    }
    async function createAccount(req, res, next) {
        try {
            const { username, password, passwordRepeat } = req.body;

            // validation of passports matching
            const passportsMatchs = password === passwordRepeat;
            const passwordPassed = password !== undefined;

            if (!passwordPassed) {
                debug(chalk.red('Password not passed'));
                return res.status(BAD_REQUEST).send('Please enter password');
            }
            if (!passportsMatchs) {
                debug(chalk.red('Passwords not match'));
                return res.status(BAD_REQUEST).send('Passwords not match');
            }
            const col = mongoose.model('Account');

            const accaunt = await new Account({ username, password });
            // validate according to the model
            try {
                await accaunt.validate();
                debug('validation passed');
                try {
                    await Account.register({ username, password }, passwordRepeat);
                } catch (err) {
                    debug('err with registration');
                    try {
                        await col.findOne({ username });
                    } catch (error) {
                        debug('cannot create accaunt');
                        return res.status(INTERNAL_SERVER_ERROR).send(error.message);
                    }
                    debug(chalk.red(`user ${chalk.green(username)} insist`));
                    req.session.errMess = `User ${username} insist`;
                    return res.status(CONFLICT).send(`User ${username} already insist`);
                }
                debug('accaunt sucsessfully registred');
                await passport.authenticate('local')(req, res, next);
                debug('sign up sucsessfully');
                return res.status(CREATED).send('Sign up successfully');
            } catch (validationError) {
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
        } catch (err) {
            return res.status(INTERNAL_SERVER_ERROR).send(err.message);
        }
    }
    function getAccount(req, res) {
        return res.status(OK).json(req.user);
    }
    async function updateAccount(req, res) {
        try {
            // eslint-disable-next-line no-underscore-dangle
            const query = { _id: req.user._id };
            const version = req.user.__v + 1;
            const update = Object.assign({}, req.body, { __v: version });
            const options = { runValidators: true };

            // eslint-disable-next-line arrow-body-style
            const requestIsNotCorrect = privateFields.some((field) => {
                return Object.prototype.hasOwnProperty.call(update, field);
            });

            if (requestIsNotCorrect) {
                return res.status(FORBIDDEN).send('you try to update forbidden fields');
            }

            await Account.findOneAndUpdate(query, update, options);
            debug('user updated');
            return res.status(OK).send('user updated');
        } catch (err) {
            debug(err.message);
            return res.status(BAD_REQUEST).send(err.message);
        }
    }
    async function deleteAccount(req, res) {
        try {
            // eslint-disable-next-line no-underscore-dangle
            const query = { _id: req.user._id };
            await Account.findOneAndRemove(query);
            return res.status(OK).send('user removed');
        } catch (err) {
            return res.status(INTERNAL_SERVER_ERROR).send(err.message);
        }
    }
    function listsMiddleWare(req, res, next) {
        return accountMiddleWare(req, res, next);
    }
    async function createList(req, res) {
        try {
            // eslint-disable-next-line no-underscore-dangle
            const currentId = req.user._id;
            await new List({
                users: [currentId],
            }).save();
            res.status(CREATED).send('list created');
        } catch (err) {
            res.status(INTERNAL_SERVER_ERROR).send(err.message);
        }
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
