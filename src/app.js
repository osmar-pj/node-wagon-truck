import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import { config } from 'dotenv'
import './database/db.js'

config();

// GENERAMOS LOS DATOS DE OPERADOR, LOCOMOTORA, CONDUCTOR, CAMION, TAJOS Y CONTRATOS
import { generateOperator, generateLocomotive, generateDriver, generateTruck, generateTajo, generateContract } from './libs/generateDates.js';
generateOperator()
generateLocomotive()
generateDriver()
generateTruck()
generateTajo()
generateContract()

import operatorRoutes from './routes/operator.routes.js'
import locomotiveRoutes from './routes/locomotive.routes.js'
import operationWagonRoutes from './routes/operation.wagon.routes.js'
import travelWagonRoutes from './routes/travel.wagon.routes.js'
import fullDataRoutes from './routes/fulldata.routes.js'
import driverRoutes from './routes/driver.routes.js'
import truckRoutes from './routes/truck.routes.js'
import operationTruckRoutes from './routes/operation.truck.routes.js'
import travelTruckRoutes from './routes/travel.truck.routes.js'
import tajoRoutes from './routes/tajo.routes.js'
import contractRoutes from './routes/contract.routes.js'

const app = express()

const corsOptions = {
    origin: '*'
}

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors(corsOptions))
app.use(express.json())

const routes = [
    operatorRoutes,
    locomotiveRoutes,
    operationWagonRoutes,
    travelWagonRoutes,
    fullDataRoutes,
    driverRoutes,
    truckRoutes,
    operationTruckRoutes,
    travelTruckRoutes,
    tajoRoutes,
    contractRoutes
]

app.use('/', routes)

app.get('/', (req, res) => {
    res.json({message : 'Welcome to the API WAGONS-TRUCKS'})
})

app.listen(process.env.PORT, () => {
    console.log('Server up running')
})