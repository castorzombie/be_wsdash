const { Schema, model } = require('mongoose');

const CoinSchema = Schema({

    itemId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    description: {
        type: String, 
        required: true       
    },

    image: {
        type: String
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

CoinSchema.method( 'toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


module.exports = model( 'Coin', CoinSchema );
