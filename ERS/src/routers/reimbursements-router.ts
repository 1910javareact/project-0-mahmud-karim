import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { getReimbursementByStatusId, getReimbursementByUserId, saveOneReimbursement, updateReimbursement } from '../services/reimbursement-service'
import { Reimbursement } from '../models/reimbursement'

export const reimbursementsRouter = express.Router()

//Find Reimbursements By Status
//Endpoint, takes statusId and returns reimbursement
reimbursementsRouter.get('/status/:statusId', [authorization(['finance-manager'])], (req,res)=>{
    let id = +req.params.statusId
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try {
            let reimbursement = getReimbursementByStatusId(id)
            res.status(200).json(reimbursement)
        } catch (e) {
            res.status(e.status).send(e.message)
        }
    }
})

//Find Reimbursements By User
//Endpoint, takes the userId and returns the reimbursement
reimbursementsRouter.get('/author/userId/:userId', [authorization(['finance-manager', 'admin', 'user'])], (req,res)=>{
    let id = +req.params.userId
    if(isNaN(id)){
        res.sendStatus(400)
    }else{
        try{
            let reimbursement = getReimbursementByUserId(id)
            res.status(200).json(reimbursement)
        } catch(e){
            res.status(e.status).send(e.message)
        }
    }
})

//Submit Reimbursement
//Endpoint, post a new reimbursement
reimbursementsRouter.post('', [authorization(['finance-manager', 'admin', 'user'])], (req, res)=>{
    let {body} = req
    let newR =  new Reimbursement(0,0,0,0,0,'',0,0,0)
    for(let key in newR){
        if(body[key] === undefined){
            res.status(400).send('Please include all reimbursement fields')
            break;
        }else{
            newR[key] = body[key]
        }
    }
    if(saveOneReimbursement(newR)){
        res.sendStatus(201)
    }else{
        res.sendStatus(500)
    }
})

//Update Reimbursement
//Endpoint, takes the input and if it exists updates only those parts
reimbursementsRouter.patch('', [authorization(['finance-manager'])], (req,res)=>{
    try{
        let{body} = req
        let update = updateReimbursement(body)
        if(update){
            res.status(200).json(update)
        }else{
            res.status(400).send('Reimbursement not found')
        }
    }catch(e){
        res.status(e.status).send(e.message)
    }
})