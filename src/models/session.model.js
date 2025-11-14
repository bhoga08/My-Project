const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    programmingLanguage: {
      type: String, 
      required: [true, 'Programming language is required'],
    }, 
    topic:{
        type: String,
        required : true
    },
    duration: {
      type: Number, 
      required: true,
      min: [1, 'Duration must be at least 1 minute'],
    },
})



module.exports = mongoose.model('Session', sessionSchema);