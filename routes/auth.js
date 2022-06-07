
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../validators/validatefields');
const { validateJWT } = require('../validators/validatejwt');

const { 
    createUser, 
    loginUser, 
    revalidateToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new', 
    [ 
        check('name', 'Name field is mandatory').not().isEmpty(),
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password must be 6 charcters').isLength({ min: 6 }),
        validateFields
    ],
    createUser  
);

router.post(
    '/',
    [
        check('email', 'Name field is mandatory').isEmail(),
        check('password', 'Password must be 6 charcters').isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);


router.get('/renew', validateJWT ,revalidateToken );


module.exports = router;