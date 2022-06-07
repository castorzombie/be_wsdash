const { Schema, model } = require('mongoose');

const SettingSchema = Schema({

    exchange: {
        type: String,
        required: true
    },

    quote: {
        type: String,
        required: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

SettingSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model( 'Setting', SettingSchema );

