
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../validators/validatefields');
const { validateJWT } = require('../validators/validatejwt');

const { 
    getCoins, 
    createCoin, 
    updateCoin, 
    deleteCoin } = require('../controllers/coins');

const router = Router();

router.use( validateJWT );
 
router.get('/:id', getCoins );

router.post(
    '/',
    [
        check('name','Name is mandatory').not().isEmpty(),
        check('description','Description is mandatory').not().isEmpty(),
        validateFields
    ],
    createCoin 
);

router.put(
    '/:id', 
    [
        check('name','Name is mandatory').not().isEmpty(),
        check('description','Description is mandatory').not().isEmpty(),
        validateFields
    ],
    updateCoin 
);

router.delete('/:id', deleteCoin );

module.exports = router;