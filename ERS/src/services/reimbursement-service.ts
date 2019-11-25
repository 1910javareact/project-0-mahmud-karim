import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId, daoSaveOneReimbursement, daoUpdateReimbursement } from "../repositories/reimbursement-dao";
import { Reimbursement } from "../models/reimbursement";

//gets the reimbursement form the doa
export function getReimbursementByStatusId(id:number):Promise<Reimbursement[]>{
    return daoGetReimbursementByStatusId(id)
}

//gets the reimbursement form the doa
export function getReimbursementByUserId(id:number):Promise<Reimbursement[]>{
    return daoGetReimbursementByUserId(id)
}

//sends the reimbursement to the doa
export function saveOneReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    return daoSaveOneReimbursement(reimbursement)
}

//updates the reimbursement
export async function updateReimbursement(reimbursement:Reimbursement):Promise<Reimbursement>{
    try {
        const reim = await daoGetReimbursementByStatusId(reimbursement.reimbursementId)
        for(let r in reimbursement){
            if(reimbursement[r] !== reim.hasOwnProperty(r)){
                reim[r] = reimbursement[r];
            }
        }
        return daoUpdateReimbursement(reim[0])
    } catch (e) {
        throw e
    }
}