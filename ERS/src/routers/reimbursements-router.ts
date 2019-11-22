import express from 'express'
import { authorization } from '../middleware/auth-middleware'
import { getReimbursementByStatusId, getReimbursementByUserId } from '../services/reimbursement-service'

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