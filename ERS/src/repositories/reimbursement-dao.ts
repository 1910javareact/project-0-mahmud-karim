import { reimbursements } from "../database";

//checks if the id matches with the ones in the database and returns it
export function daoGetReimbursementByStatusId(id:number){
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
export function daoGetReimbursementByUserId(id:number){
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