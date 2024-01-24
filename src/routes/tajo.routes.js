import express from 'express'

import { getAllTajos, getTajo, createTajo, updateTajo, deleteTajo } from '../controllers/TajoController.js'

const router = express.Router()

router.get('/tajo', getAllTajos)

router.get('/tajo/:tajoId', getTajo)

router.post('/tajo', createTajo)

router.put('/tajo/:tajoId', updateTajo)

router.delete('/tajo/:tajoId', deleteTajo)

export default router