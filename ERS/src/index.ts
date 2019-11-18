import express from 'express'
import bodyparser from 'body-parser'

//Builds the express app
const app = express()

//Parses the json into objects
app.use(bodyparser.json())

//App is listening at this port
app.listen(1001, ()=> {
    console.log('app has started');
})