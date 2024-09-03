const mongoose = require('mongoose')

const questionSchema = new Schema({
    question:{

    },
    user_id:{

    },
    answer:{

    },
    answered:{

    }
})

module.exports = mongoose.model('question',questionSchema);