const express = require('express');
let app = express()
app.use(express.static('public'))//static assets go here

app.set('view engine', 'ejs') //ejs engine templates


// setup a routes folder 
//index.js 
//albums.js 

app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/feedback'))
app.use(require('./routes/chat'))


app.listen(3000,()=>{
    console.log(`listening to {3000}`)
})