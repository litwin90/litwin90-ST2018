const express = require('express');
const apiController = require('../controllers/apiController');

const apiRouter = express.Router();

function router() {
    const {
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
    } = apiController();
    apiRouter.route('/account')
        .post(createAccount);
    apiRouter.route('/account/me')
        .all(accountMiddleWare)
        .get(getAccount)
        .put(updateAccount)
        .delete(deleteAccount);
    apiRouter.route('/lists')
        .all(accountMiddleWare)
        .post(createList)
        .get(getLists);
    apiRouter.route('/lists/:id')
        .all(listMiddleWare)
        .get(getListById)
        .put(updateListById)
        .delete(deleteListBuId);
    apiRouter.route('/lists/:listId/todos')
        .all(listMiddleWare)
        .post(createTodos)
        .get(getTodos);
    apiRouter.route('/lists/:listId/todos/:id')
        .all(todoMiddleWare)
        .get(getTodoById)
        .put(changeTodoById)
        .delete(deleteTodoById);
    return apiRouter;
}

module.exports = router;
