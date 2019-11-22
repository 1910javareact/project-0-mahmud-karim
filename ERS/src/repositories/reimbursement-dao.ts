import { reimbursements } from "../database";

//checks if the id matches with the ones in the databas and returns it
export function daoGetReimbursementByStatusId(id:number){
    for(let r of reimbursements){
        if(r.reimbursementId === id){
            return r
        }
    }
    throw {
        status:404,
        message:'this garden does not exist'
    }
}