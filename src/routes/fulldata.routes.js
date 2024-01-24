import express from 'express'

import { getAllDriversTrucks, insertWagonData, insertTruckData, getListWagon, getListTruck, getTruckUpdated } from '../controllers/DataController.js'

const router = express.Router()

// DRIVERS, TRUCKS AND TAJOS
router.get('/drivertruck', getAllDriversTrucks)

// INSERT DATA - WAGONS AND TRUCKS
router.post('/fulldata', insertWagonData)
router.post('/truckdata', insertTruckData)

// OPERATION AND TRAVEL - WAGON
router.get('/opWagon', getListWagon)

// OPERATION AND TRAVEL - TRUCK
router.get('/opTruck', getListTruck)

// UPDATED TRUCK
router.post('/updatedTruck', getTruckUpdated)


export default router