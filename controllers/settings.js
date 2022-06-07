const { response } = require('express');

const Setting = require('../models/setting');


const getSetting = async( req, res = response ) => {

    const setting = await Setting.find( { user : req.uid } );

    res.json({
        ok: true,
        setting
    });

}

const createSetting = async ( req, res = response ) => {

    const setting = new Setting( req.body );

    try {

        setting.user = req.uid;
        
        const settingStored = await setting.save();
        
        res.json({
            ok: true,
            setting: settingStored
        });

    } catch ( error ) {

        console.log( 'setting error ' )

        res.status(500).json({
            ok: false,
            msg: 'Unable to store new setting'
        });

    }

}

const updateSetting = async( req, res = response ) => {
    
    const settingId = req.params.id;
    const uid = req.uid;

    try {

        const setting = await Setting.findById( settingId );

        if ( !setting ) {
            return res.status(404).json({
                ok: false,
                msg: 'Setting not exists with provided id'
            });
        }

        if ( setting.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No privileges for editing this setting'
            });
        }

        const newSetting = {
            ...req.body,
            user: uid
        }

        const settingUpdated = await Setting.findByIdAndUpdate( settingId, newSetting, { new: true } );

        res.json({
            ok: true,
            setting: settingUpdated
        });
        
    } catch ( error ) {

        res.status(500).json({
            ok: false,
            msg: 'Service unavailable'
        });

    }

}

module.exports = {
    getSetting,
    createSetting,
    updateSetting
}