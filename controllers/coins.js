const { response } = require('express');
const Coin = require('../models/Coin');

const getCoins = async( req, res = response ) => {

    const coins = await Coin.find( { user : req.uid } );

    res.json({
        ok: true,
        coins
    });

}

const createCoin = async ( req, res = response ) => {

    const coin = new Coin( req.body );

    try {

        coin.user = req.uid;
        
        const coinStored = await coin.save();

        res.json({
            ok: true,
            coin: coinStored
        })


    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'Unable to store new coin'
        });

    }

}

const updateCoin = async( req, res = response ) => {
    
    const coinId = req.params.id;
    const uid = req.uid;

    try {

        const coin = await Coin.findById( coinId );

        if ( !coin ) {
            return res.status(404).json({
                ok: false,
                msg: 'Coin not exists with provided id'
            });
        }

        if ( coin.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No privileges for editing this coin'
            });
        }

        const newCoin = {
            ...req.body,
            user: uid
        }

        const coinUpdated = await Coin.findByIdAndUpdate( coinId, newCoin, { new: true } );

        res.json({
            ok: true,
            coin: coinUpdated
        });
        
    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'Service unavailable'
        });

    }

}

const deleteCoin = async( req, res = response ) => {

    const coinId = req.params.id;
    const uid = req.uid;

    try {

        const coin = await Coin.findById( coinId );

        if ( !coin ) {
            return res.status(404).json({
                ok: false,
                msg: 'Coin not exists with provided id'
            });
        }

        if ( coin.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No privileges for deleting this coin'
            });
        }


        await Coin.findByIdAndDelete( coinId );

        res.json({ ok: true });

        
    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'Service unavailable'
        });

    }

}


module.exports = {
    getCoins,
    createCoin,
    updateCoin,
    deleteCoin
}