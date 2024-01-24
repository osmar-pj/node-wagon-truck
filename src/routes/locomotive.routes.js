import express from 'express'

import { getAllLocomotives, getLocomotive, createLocomotive, updateLocomotive, deleteLocomotive } from '../controllers/LocomotiveController.js'

const router = express.Router()

router.get('/locomotive', getAllLocomotives)

router.get('/locomotive/:locomotiveId', getLocomotive)

router.post('/locomotive', createLocomotive)

router.put('/locomotive/:locomotiveId', updateLocomotive)

router.delete('/locomotive/:locomotiveId', deleteLocomotive)

export default router