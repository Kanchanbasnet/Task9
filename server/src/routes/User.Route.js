const router = require('express').Router();
const loggermiddleware = require('../middlewares/logger.middleware');
const { createUser, login, getOneUser, updateUser, getAllUsers, deleteUser } = require('../modules/User/User.Controller');
const {createUserSchema, idValidationSchema, updateSchema, paginationSchema} = require('../validator/validator');
const userValidation = require('../middlewares/yupvalidator');
const errorHandler = require('../middlewares/errorHandler');


router.use(errorHandler);
router.get('/', userValidation(paginationSchema), getAllUsers);
router.post('/login', login);
router.post('/', userValidation(createUserSchema), createUser);
const {jwtAuthentication}= require('../middlewares/jwtAuthentication');
router.use(jwtAuthentication);
router.get('/:id', userValidation(idValidationSchema), getOneUser);
router.put('/:id', userValidation(updateSchema), updateUser);
router.delete('/:id', userValidation(idValidationSchema),  deleteUser);
module.exports = router;

