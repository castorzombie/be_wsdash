
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../validators/validatefields');
const { validateJWT } = require('../validators/validatejwt');

const { 
    getSetting, 
    createSetting, 
    updateSetting } = require('../controllers/settings');

const router = Router();

router.use( validateJWT );
 
router.get('/:id', getSetting );

router.post(
    '/',
    [
        check('exchange','Exchange is mandatory').not().isEmpty(),
        check('quote','Quote is mandatory').not().isEmpty(),
        validateFields
    ],
    createSetting
);

router.put(
    '/:id', 
    [
        check('exchange','Exchange is mandatory').not().isEmpty(),
        check('quote','Quote is mandatory').not().isEmpty(),
        validateFields
    ],
    updateSetting
);

module.exports = router;