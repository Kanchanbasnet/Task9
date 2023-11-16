const yup = require('yup');


const createUserSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .test('is-valid', 'Numeric values are not allowed.', (value) => {
        return !/\d/.test(value);
      })
      .min(3, 'Name must be 3 characters long.')
      .required('Name is required.'),
    email: yup.string().email('Email is invalid.').required('Email is required.'),
    username: yup.string().required('Username is required.'),
    password: yup.string().min(6, 'Password must be 6 characters long.').required('Password is required.'),
    address: yup.string().required('Address is required.')
  })
});


const idValidationSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Inavlid uuid format').required('id is required.')
  })
});
const updateSchema = yup.object({
  params: yup.object({
    id: yup.string().uuid('Invalid uuid format').required('id is required')
  }),
  body: yup.object({
    name:yup.string().test('is-valid', 'Numeric values are not allowed.', (value)=>{return !/\d/.test(value);}).optional().min(3, 'name must be 3 characters long.').required('name is required.'),
    email:yup.string().optional().email('email is invalid.').required('email is required.'),
    address:yup.string().optional().required('address is required.')


    
  })
})


const paginationSchema = yup.object({
  query: yup.object({
    page: yup.number().positive().integer().test('is-valid', 'Invalid page number.', (value)=>!isNaN(value)).min(1, 'page value must be greater than 0').default(1),
    limit: yup.number().positive().integer().test('is-valid', 'Invalid page limit.', (value)=>!isNaN(value)).min(1, 'page limit must be greater than 0').default(10),

  })
})

module.exports = {createUserSchema, idValidationSchema, updateSchema, paginationSchema};































// const {body, validationResult, param, query} = require('express-validator');

//  const createUserValidation = [
//     body('name').trim().isString().notEmpty().withMessage('name is required.').bail().isLength({min: 3}).withMessage('Minimum 3 characters required.'),
//     body('username').trim().isString().notEmpty().withMessage('username is required.'),
//     body('email').notEmpty().trim().normalizeEmail().withMessage('email is required.').bail().isEmail().withMessage('Invalid Email.'),
//     body('address').trim().isString().notEmpty().withMessage('address is required.'),
//     body('password').trim().isLength({min:6}).withMessage('Password must be at least 6 character long.'),
//     (req, res, next) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//           return res.status(400).json({ errors: errors.array() });
//         }
//         next();
//       },



// ];
//  const idValidation = [
//     param('id').notEmpty().withMessage('id is not provided.').isUUID('Invalid id format.')

// ]
// const paginationValidation = [

// ]
  
// module.exports = createUserValidation, idValidation, paginationValidation;



