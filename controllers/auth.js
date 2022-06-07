const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');
 
const createUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'User already exist'
            });
        }

        user = new User( req.body );
    
        const salt = bcrypt.genSaltSync();

        user.password = bcrypt.hashSync( password, salt );


        await user.save();

        const token = await generarJWT( user.id, user.name );
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'server error contact adminisrator'
        });

    }
}


const loginUser = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({ email });

        if ( !user) {
            return res.status(400).json({
                ok: false,
                msg: 'User not exist with this email'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong Password'
            });
        }

        const token = await generarJWT( user.id, user.name );

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })


    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'server error contact adminisrator'
        });
    }

}


const revalidateToken = async ( req, res = response ) => {

    const { uid, name } = req;

    const token = await generarJWT( uid, name );

    const user = await User.findById( uid );
    
    res.json({
        ok: true,
        token,
        uid,
        name: user.name,
    })
}




module.exports = {
    createUser,
    loginUser,
    revalidateToken
}