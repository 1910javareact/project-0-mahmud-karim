import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId, daoSaveOneReimbursement } from "../repositories/reimbursement-dao";
import { Reimbursement } from "../models/reimbursement";

//gets the reimbursement form the doa
export function getReimbursementByStatusId(id:number):Reimbursement{
    return daoGetReimbursementByStatusId(id)
}

//gets the reimbursement form the doa
export function getReimbursementByUserId(id:number):Reimbursement{
    return daoGetReimbursementByUserId(id)
}

//sends the reimbursement to the doa
export function saveOneReimbursement(reimbursement:Reimbursement){
    return daoSaveOneReimbursement(reimbursement)
}