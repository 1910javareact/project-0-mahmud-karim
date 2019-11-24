import express from 'express'
import { getAllUsers, getUserById, updateUser } from '../services/find-users-service'
import { authorization } from '../middleware/auth-middleware'

//creates the usersRouter object
export const usersRouter = express.Router()

//Find Users
//Checks for authorization then gets all the users
usersRouter.get('',[authorization(['finance-manager'])], 
async (req,res)=>{
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (e) {
        res.status(e.status).send(e.message);
    }
})

//Find Users By Id
//Checks the authorization and then gets the user based on Id if matches
usersRouter.get('/:id', [authorization(['finance-manager', 'admin', 'user'])], 
async (req,res)=>{
    const id = +req.params.id
    if(isNaN(id)){
        res.sendStatus(400)
    }else if (req.session.user.role.role === 'finance-manager'){
        try {
            const user = await getUserById(id)
            res.status(200).json(user)
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    }else{
        try {
            const user = await getUserById(id)
            if (req.session.user.userId === user.userId){
                res.status(200).json(user)
            }else{
                res.sendStatus(401)
            }
        } catch (error) {
            res.status(error.status).send(error.message)
        }
    }
})

//Update User
//Uses the UserId to update the feilds provided
usersRouter.patch('',[authorization(['admin'])], async (req,res)=>{
    try{
        let {body} = req
        const update = await updateUser(body)
        if (update){
            res.status(200).json(update)
        }else{
            res.status(400).send('User not found')
        }
    }catch(e){
        res.status(e.status).send(e.message)
    }
})