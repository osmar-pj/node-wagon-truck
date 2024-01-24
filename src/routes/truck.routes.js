import express from 'express'

import { getAllTrucks, getTruck, createTruck, updateTruck, deleteTruck } from '../controllers/TruckController.js'

const router = express.Router()

router.get('/truck', getAllTrucks)

router.get('/truck/:truckId', getTruck)

router.post('/truck', createTruck)

router.put('/truck/:truckId', updateTruck)

router.delete('/truck/:truckId', deleteTruck)

export default router