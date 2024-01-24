import express from 'express'

import { getAllContracts, getContract, createContract, updateContract, deleteContract } from '../controllers/ContractController.js'

const router = express.Router()

router.get('/contract', getAllContracts)

router.get('/contract/:contractId', getContract)

router.post('/contract', createContract)

router.put('/contract/:contractId', updateContract)

router.delete('/contract/:contractId', deleteContract)

export default router