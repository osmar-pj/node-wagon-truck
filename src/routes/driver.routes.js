import express from 'express'

import { getAllDrivers, getDriver, createDriver, updateDriver, deleteDriver } from '../controllers/DriverController.js'

const router = express.Router()

router.get('/driver', getAllDrivers)

router.get('/driver/:driverId', getDriver)

router.post('/driver', createDriver)

router.put('/driver/:driverId', updateDriver)

router.delete('/driver/:driverId', deleteDriver)

export default router