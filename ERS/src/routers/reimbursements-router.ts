import express from 'express'

export const reimbursementsRouter = express.Router()

reimbursementsRouter.get('/status/:statusId')