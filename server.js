const express = require('express')
const app = express()

app.get('/', (req,res) =>{
    console.log('Here');
   res.status(200).json({ message : 'Error'})
    
})
app.get('/home', (req,res) =>{
    console.log('Here');
   res.status(200).json({ data : 'Home'})
    
})
app.post('/' , (req,res) => {
    res.send('You can post to this endpoint... ')
})

app.listen(3000)