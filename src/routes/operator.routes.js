import express from 'express'

import { getAllOperators, getOperator, createOperator, updateOperator, deleteOperator } from '../controllers/OperatorController.js'

const router = express.Router()

router.get('/operator', getAllOperators)

router.get('/operator/:operatorId', getOperator)

router.post('/operator', createOperator)

router.put('/operator/:operatorId', updateOperator)

router.delete('/operator/:operatorId', deleteOperator)

export default router