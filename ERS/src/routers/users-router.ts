import express from 'express'
import { getAllUsers, getUserById } from '../services/find-users-service'
import { authorization } from '../middleware/auth-middleware'

//creates the usersRouter object
export const usersRouter = express.Router()

//Checks for authorization then gets all the users
usersRouter.get('',[authorization(['finance-manager'])], (req,res)=>{
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendStatus(500)
    }
})

//Checks the authorization and then gets the user based on Id
usersRouter.get('/:id', (req,res)=>{
    let id = +req.params.userId
    
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try {
            let user = getUserById(id)
            res.json(user)
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    }
})