import { daoGetReimbursementByStatusId } from "../repositories/reimbursement-dao";

//gets the reimbursement form the doa
export function getReimbursementByStatusId(id:number){
    return daoGetReimbursementByStatusId(id)
}