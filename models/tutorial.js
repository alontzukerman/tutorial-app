const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const url = 
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@clustera.2q9bq.mongodb.net/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;
console.log('connecting to', url);

mongoose.connect(url , { useNewUrlParser: true , useUnifiedTopology: true })
    .then( result => {
        console.log('Connected to MongoDB');
    })
    .catch( error => {
        console.log('Error connecting to mongoDB', error.message);
    })

const tutorialSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: Date,
    published: Boolean
})

// tutorialSchema.set('toJSON', {
//     transform: (document, returnedObject) => {
//         returnedObject.id = returnedObject._id.toString()
//         delete returnedObject._id
//         delete returnedObject.__v
//     }
//   })

module.exports = mongoose.model('Tutorial', tutorialSchema)