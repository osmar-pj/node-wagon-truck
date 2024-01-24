import express from 'express'

import { getAllOperationsWagons, getOperationWagon, createOperationWagon, updateOperationWagon, deleteOperationWagon } from '../controllers/OperationWagonController.js'

const router = express.Router()

router.get('/operation', getAllOperationsWagons)

router.get('/operation/:operation_Id', getOperationWagon)

router.post('/operation', createOperationWagon)

router.put('/operation/:operation_Id', updateOperationWagon)

router.delete('/operation/:operation_Id', deleteOperationWagon)

export default router