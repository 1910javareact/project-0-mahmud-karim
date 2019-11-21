import express from 'express'
import { getAllUsers } from '../services/find-users-service'
import { authorization } from '../middleware/auth-middleware'

export const usersRouter = express.Router()

usersRouter.get('',[authorization(['finance-manager'])], (req,res)=>{
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendStatus(500)
    }
})