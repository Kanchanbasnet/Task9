const loggermiddleware = require('../middlewares/logger.middleware');
const { createUser, login, getOneUser, updateUser, getAllUsers, deleteUser } = require('../modules/User/User.Controller');
const {jwtAuthentication}= require('../middlewares/jwtAuthentication');
const {createUserSchema, idValidationSchema, updateSchema, paginationSchema} = require('../validator/validator');
const userValidation = require('../middlewares/yupvalidator');
const errorHandler = require('../middlewares/errorHandler');


const router = require('express').Router();
router.use(errorHandler);




router.get('/', userValidation(paginationSchema), getAllUsers);

router.post('/', userValidation(createUserSchema), createUser);
router.post('/login', login);
router.get('/:id',jwtAuthentication, userValidation(idValidationSchema), getOneUser);
router.put('/:id', userValidation(updateSchema), updateUser);
router.delete('/:id', userValidation(idValidationSchema),  deleteUser);
module.exports = router;

