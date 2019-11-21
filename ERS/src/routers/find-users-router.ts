import express from 'express'
import { getAllUsers } from '../services/find-users-service'

export const findUsersRouter = express.Router()

findUsersRouter.get('', (req,res)=>{
    let users = getAllUsers()
    if(users){
        res.json(users)
    }else{
        res.sendStatus(500)
    }
})