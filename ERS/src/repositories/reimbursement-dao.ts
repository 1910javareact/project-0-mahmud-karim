import { reimbursements } from "../database";
import { Reimbursement } from "../models/reimbursement";

//checks if the id matches with the ones in the database and returns it
export function daoGetReimbursementByStatusId(id:number):Reimbursement{
    for(let r of reimbursements){
        if(r.reimbursementId === id){
            return r
        }
    }
    throw {
        status:404,
        message:'This reimbursement does not exist'
    }
}

//checks if the id matches with the ones in the database and returns it
export function daoGetReimbursementByUserId(id:number):Reimbursement{
    for(let r of reimbursements){
        if(r.author === id){
            return r
        }
    }
    throw {
        status:404,
        message:'This reimbursement does not exist'
    }
}

//The number of reimbursements already in the database
let id = 3
//adds the reimbursement to the database
export function daoSaveOneReimbursement(reimbursement:Reimbursement){
    reimbursement.reimbursementId = id
    id++;
    reimbursements.push(reimbursement)
    return true
}

//saves the update reimbursement to the database
export function daoUpdateReimbursement(reimbursement:Reimbursement){
    for(let r of reimbursements){
        if(r.reimbursementId === reimbursement.reimbursementId){
            r = reimbursement
            return r
        }
    }
    throw{
        status:404,
        message:'this reimbursement does not exist'
    }
}