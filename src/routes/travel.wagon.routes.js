import express from 'express'

import { getAllTravelWagons, getTravelWagon, createTravelWagon, updateTravelWagon, deleteTravelWagon } from '../controllers/TravelWagonController.js'

const router = express.Router()

router.get('/travel', getAllTravelWagons)

router.get('/travel/:travel_Id', getTravelWagon)

router.post('/travel/create', createTravelWagon)

router.put('/travel/:travel_Id', updateTravelWagon)

router.delete('/travel/:travel_Id', deleteTravelWagon)

export default router