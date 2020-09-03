const express = require('express');
const app = express();
require('dotenv').config()
const Tutorial = require('./models/tutorial');

app.use(express.json());

app.get('/api/tutorials' , async (req , res) => { // get all tutorials
    try {
        if(req.query.title) {
            console.log(req.query.title);
            const filteredTutorials = await Tutorial.find({title: {$regex: `.*${req.query.title}*`}});
            console.log(filteredTutorials);
            res.json(filteredTutorials);
        } else { 
            const tutorials = await Tutorial.find({});
            res.json(tutorials);
        }
    } catch (error) {
        res.status(500).end();
    }
})

app.get('/api/tutorials/published' , async (req , res) => {
    try {
        const publishedTutorials = await Tutorial.find({published: true});
        res.json(publishedTutorials);
    } catch ( error ) {
        res.status(500).end();
    }
})

app.get('/api/tutorials/:id' , async (req , res) => { // get tutorial by id
    try {
        const tutorial = await Tutorial.findById(req.params.id);
        res.json(tutorial);
    } catch (error) {
        res.status(500).end();
    }
})


app.post('/api/tutorials' , (req , res) => { // post new tutorial
    const body = req.body ;

    const tutorial = new Tutorial({
        title: body.title,
        content: body.content,
        date: new Date(),
        published: false
    })

    tutorial.save().then( savedTutorial => {
        res.json(savedTutorial);
    })
})

app.put('/api/tutorials/:id' , async (req , res) => {
    try {
        await Tutorial.findByIdAndUpdate(req.params.id , {
            title: req.body.title,
            content: req.body.content,
            published: true
        }, { new: true });
        res.send(`Tutorial updated`);
    } catch ( error ) {
        console.log(error);
        res.status(500).end();
    }
})

app.delete('/api/tutorials' , async (req , res) => {
    try {
        await Tutorial.deleteMany();
        res.send('All tutorials removed')
    } catch ( error ) {
        res.status(500).end();
    }
})
app.delete('/api/tutorials/:id' , async (req , res) => {
    try {
        await Tutorial.findByIdAndRemove(req.params.id);
        res.send('Tutorial removed')
    } catch ( error ) {
        res.status(500).end();
    }
})




const PORT = process.env.PORT;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));