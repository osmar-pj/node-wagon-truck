import express from 'express'

import { getAllTravelsTrucks, getTravelTruck, createTravelTruck, updateTravelTruck, deleteTravelTruck } from '../controllers/TravelTruckController.js'

const router = express.Router()

router.get('/truckTravel', getAllTravelsTrucks)

router.get('/truckTravel/:travelTruck_Id', getTravelTruck)

router.post('/truckTravel', createTravelTruck)

router.put('/truckTravel/:travelTruck_Id', updateTravelTruck)

router.delete('/truckTravel/:travelTruck_Id', deleteTravelTruck)

export default router