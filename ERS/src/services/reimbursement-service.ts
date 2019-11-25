import { daoGetReimbursementByStatusId, daoGetReimbursementByUserId, daoSaveOneReimbursement, daoUpdateReimbursement } from '../repositories/reimbursement-dao';
import { Reimbursement } from '../models/reimbursement';

// gets the reimbursement form the doa
export function getReimbursementByStatusId(id: number): Promise<Reimbursement[]> {
    try {
        return daoGetReimbursementByStatusId(id);
    } catch (e) {
        throw e;
    }
}

// gets the reimbursement form the doa
export function getReimbursementByUserId(id: number): Promise<Reimbursement[]> {
    try {
        return daoGetReimbursementByUserId(id);
    } catch (e) {
        throw e;
    }
}

// sends the reimbursement to the doa
export function saveOneReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    try {
        return daoSaveOneReimbursement(reimbursement);
    } catch (e) {
        throw e;
    }
}

// updates the reimbursement
export async function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    try {
        return daoUpdateReimbursement(reimbursement);
    } catch (e) {
        throw e;
    }
}