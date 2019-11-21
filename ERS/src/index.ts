import express from 'express'
import bodyparser from 'body-parser'
import { usersRouter } from './routers/users-router'
import { sessionMiddleware } from './middleware/session-middleware'
import { getUserByUsernameAndPassword } from './services/find-users-service'

//Builds the express app
const app = express()

//Parses the json into objects
app.use(bodyparser.json())

//Creates a new session object for each req object
app.use(sessionMiddleware)

//Has the user enter login credentails
app.post('/login', (req,res)=>{
    let {username, password} = req.body
    //Does not enter both username and password
    if(!username || !password){
        res.status(400).send('Please have a username and password field')
    }
    //Tries to check if the username and password exists else throws an error message
    try{
        let user = getUserByUsernameAndPassword(username, password)
        req.session.user = user
        res.json(user)
    }catch(e){
        res.status(e.status).send(e.message)
    }
})

//Find Users end point
app.use('/users', usersRouter)

//App is listening at this port
app.listen(9002, ()=> {
    console.log('app has started');
})