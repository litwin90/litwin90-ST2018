const express = require('express');
const apiController = require('../controllers/apiController');

const apiRouter = express.Router();

function router() {
    const {
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
    } = apiController();
    apiRouter.route('/account')
        .all(accountMiddleWare)
        .post(createAccount);
    apiRouter.route('/account/me')
        .get(getAccount)
        .put(updateAccount)
        .delete(deleteAccount);
    apiRouter.route('/lists')
        .all(listsMiddleWare)
        .post(createList)
        .get(getLists);
    apiRouter.route('/lists/:id')
        .get(getListById)
        .put(updateListById)
        .delete(deleteListBuId);
    apiRouter.route('/lists/:listId/todos')
        .post(createTodos)
        .get(getTodos);
    apiRouter.route('/lists/:listId/todos/:id')
        .get(getTodoById)
        .put(changeTodoById)
        .delete(deleteTodoById);
    return apiRouter;
}

module.exports = router;
