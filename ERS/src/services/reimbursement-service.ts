import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId } from "../repositories/reimbursement-dao";

//gets the reimbursement form the doa
export function getReimbursementByStatusId(id:number){
    return daoGetReimbursementByStatusId(id)
}

//gets the reimbursement form the doa
export function getReimbursementByUserId(id:number){
    return daoGetReimbursementByUserId(id)
}