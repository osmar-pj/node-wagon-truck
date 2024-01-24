import express from 'express'

import { getAllOperationsTrucks, getOperationTruck, createOperationTruck, updateOperationTruck, deleteOperationTruck } from '../controllers/OperationTruckController.js'

const router = express.Router()

router.get('/truckOperation', getAllOperationsTrucks)

router.get('/truckOperation/:operationTruck_Id', getOperationTruck)

router.post('/truckOperation', createOperationTruck)

router.put('/truckOperation/:operationTruck_Id', updateOperationTruck)

router.delete('/truckOperation/:operationTruck_Id', deleteOperationTruck)

export default router