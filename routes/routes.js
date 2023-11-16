const Customer = require('../models/model');

const express = require('express');

const router = express.Router()

//Post Method
router.post('/post', async (req, res) => {
    //res.send('Post API')
    console.log("I received /post")
    console.log(req.body.name)
    const data = new Customer({
        name: req.body.name,
        age: req.body.age
    })

    //console.log('Right here!!')
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#awaiting_a_promise_to_be_fulfilled
    try {
        const dataToSave = await data.save();
        //res.status(200).json(dataToSave)

        res.render('form', {msg: `We saved ${req.body.name}'s record for you. Thanks!`})
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

})



//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Customer.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Customer.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Customer.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Customer.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = router;

