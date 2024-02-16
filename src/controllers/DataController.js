// IMPORTAMOS TODOS LOS MODELOS
import axios from 'axios'
import moment from 'moment-timezone'

import OperatorModel from '../models/OperatorModel.js'
import LocomotiveModel from '../models/LocomotiveModel.js'

import OperationModel from '../models/OperationWagonModel.js'
import TravelModel from '../models/TravelWagonModel.js'

import OperationTruckModel from '../models/OperationTruckModel.js'
import TravelTruckModel from '../models/TravelTruckModel.js'

import DriverModel from '../models/DriverModel.js'
import TruckModel from '../models/TruckModel.js'

import TajoModel from '../models/TajoModel.js'
import ContractModel from '../models/ContractModel.js'

import Truck from '../models/TruckModel.js'

const fnTransform = (wagons) => {
    return wagons.reduce((acc, wagon) => {
        const found = acc.find(w => w.material === wagon.material)
        if (found) {
            found.count++
        } else {
            acc.push({material: wagon.material, count: 1})
        }
        return acc
    }, [])
}

// ENVIAMOS DRIVERS, TRUCKS Y TAJOS
export const getAllDriversTrucks = async (req, res) => {
    try {
        const drivers = await DriverModel.find({}, {driverId: 1, name: 1, contract: 1, valid: 1, _id: 0})

        const trucks = await TruckModel.find({}, {truckId: 1, tag: 1, tara: 1, contract: 1, valid: 1, updatedAt: 1, _id: 0})

        const tajos = await TajoModel.find({}, {tajoId: 1, name: 1, _id: 0})

        const pilas = await axios.get(`${process.env.GEOLOGY_URL}/pila`)

        const truckData = trucks.map((truck) => ({
            truckId: truck.truckId,
            tag: truck.tag,
            tara: truck.tara,
            contract: truck.contract,
            valid: truck.valid,
            updatedAt: truck.updatedAt.getTime()
        }))

        const pilasData = pilas.data.pilasToAppTruck.map((pila) => ({
            cod_tableta: pila.cod_tableta
        }))

        return res.status(200).json({drivers: drivers, trucks: truckData, tajos: tajos, pilas: pilasData})

    } catch (error) {
        res.json({message: error.message})
    }
}

// REGISTRO DE DATA DE VAGONES
export const insertWagonData = async (req, res) => {
    try {
        const fulldata = req.body
        
        const insertData = async (Model, data) => {
            const newDataTagers = new Model(data)
            await newDataTagers.save()
            return newDataTagers
        }

        const dataOperations = fulldata.dataOperation
        const newOperationData = []

        for (const operationData of dataOperations) {
            const newOperation = await insertData(OperationModel, operationData)
            newOperationData.push(newOperation)
        }

        const dataTravels = fulldata.dataTravel
        const newTravelData = []

        for (const travelData of dataTravels) {
            const newTravel = await insertData(TravelModel, travelData)
            newTravel.timestamp = Math.floor(newTravel.dataCreatedAt/1000)
            newTravelData.push(newTravel)
        }

        const dataTravelsIncompleto = fulldata.dataTravelIncompleto
        const newTravelDataIncompleto = []

        if (dataTravelsIncompleto && dataTravelsIncompleto.length > 0) {
            for (const travelDataIncompleto of dataTravelsIncompleto) {
                const newTravelIncompleto = await insertData(TravelModel, travelDataIncompleto)
                newTravelDataIncompleto.push(newTravelIncompleto)
            }
        }
        await Promise.all([...newOperationData, ...newTravelData, ...newTravelDataIncompleto])
        const isTest = newTravelData.some(i => i.operator_Id === 99 || i.locomotive_Id === 99)
        if (isTest) return res.status(200).json({ status: true, message: 'Es un viaje de prueba' })
        const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO','AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
        const tripsFormatted = newTravelData.map(async (i) => {
            const operation = await OperationModel.findOne(({code: i.code}))
            const locomotive = await LocomotiveModel.findOne(({locomotiveId: i.locomotive_Id}))
            const operator = await OperatorModel.findOne(({operatorId: i.operator_Id}))
            const validWagons = i.wagons.filter(i => i.material != 'VACIO' && i.material != 'INOPERATIVO')
            const tonh = validWagons.length * 8
            const ton = tonh * 0.94
            const destinos = i.destino
            const materials2 = fnTransform(validWagons)
            const materials = materials2.map(material => {
                if (material.material === 'POLIMETALICO') {
                    return {material: 'Polimetálico', count: material.count}
                }
                if (material.material === 'ALABANDITA') {
                    return {material: 'Ag/Alabandita', count: material.count}
                }
                if (material.material === 'CARBONATO') {
                    return {material: 'Ag/Carbonatos', count: material.count}
                }
                if (material.material === 'DESMONTE') {
                    return {material: 'Desmonte', count: material.count}
                }
                return material
            })
            return {
                code: i.code,
                month: months[new Date(i.dataCreatedAt).getMonth()], // ENERO / DIC
                year: new Date(i.dataCreatedAt).getFullYear(), // 2021
                date: new Date(i.dataCreatedAt), // 01/01/2021
                nro_month: new Date(i.dataCreatedAt).getMonth() + 1, // mes de NODE
                timestamp: i.timestamp,
                dataCreatedAt: i.dataCreatedAt,
                wagons: i.wagons,
                mining: i.mining.toUpperCase(),
                status: 'Cancha',
                destiny: destinos,
                ubication: 'Cancha 2',
                pila: destinos.length > 1 ? null : destinos[0],
                turn: operation.turno,
                operator: operator.name,
                tag: locomotive.tag,
                contract: 'CIA',
                materials: materials.length > 1 ? materials : null,
                dominio: materials.length > 1 ? null : materials[0].material,
                vagones: validWagons.length,
                ton: ton,
                tonh: tonh,
                statusMina: 'Completo',
                statusTrip: destinos.length > 1 ? 'waitSplit' : 'waitComplete',
                history: [{work: destinos.length > 1 ? 'CREATE viaje de locomotora de diferente material' : 'CREATE viaje de locomotora de un tipo de material', date: i.timestamp, user: operator.name}],
                carriage: 'Vagones',
                splitRequired: destinos.length > 1 ? true : false
            }
        })
        const data = await Promise.all([...tripsFormatted])
        await axios.post(`${process.env.GEOLOGY_URL}/trip`, data)
        return res.status(200).json({ status: true, message: 'Se ha registrado la data correctamente en la base de datos' })
    } catch (error) {
        res.json({ message: error.message })
    }
}

// REGISTRO DE DATA DE CAMIONES
export const insertTruckData = async (req, res) => {
    try {
        const truckdata = req.body

        const insertData = async (Model, data) => {
            const newDataTagers = new Model(data)
            await newDataTagers.save()
            return newDataTagers
        }

        const drivers = await DriverModel.find({ valid: { $in: [1, 2] } }, { driverId: 1, _id: 0 })
        const validDriverIds = drivers.map(driver => driver.driverId)

        const trucks = await TruckModel.find({ valid: { $in: [1, 2] } }, { truckId: 1, _id: 0 })
        const validTruckIds = trucks.map(truck => truck.truckId)

        const dataOperations = truckdata.dataOperation
        const newOperationData = []

        for (const operationData of dataOperations) {
            if (validDriverIds.includes(operationData.driver_Id) && validTruckIds.includes(operationData.truck_Id)) {
                const newOperation = await insertData(OperationTruckModel, operationData)
                newOperationData.push(newOperation)
            }
        }

        const dataTravels = truckdata.dataTravel
        const newTravelData = []

        for (const travelData of dataTravels) {
            if (validDriverIds.includes(travelData.driver_Id) && validTruckIds.includes(travelData.truck_Id)) {
                const newTravel = await insertData(TravelTruckModel, travelData)
                newTravel.timestamp = Math.floor(newTravel.dataCreatedAt/1000)
                newTravelData.push(newTravel)
            }
        }

        const dataTravelsIncompleto = truckdata.dataTravelIncompleto
        const newTravelDataIncompleto = []

        if (dataTravelsIncompleto && dataTravelsIncompleto.length > 0) {
            for (const travelDataIncompleto of dataTravelsIncompleto) {
                if (validDriverIds.includes(travelDataIncompleto.driver_Id) && validTruckIds.includes(travelDataIncompleto.truck_Id)) {
                    const newTravelIncompleto = await insertData(TravelTruckModel, travelDataIncompleto)
                    newTravelDataIncompleto.push(newTravelIncompleto)
                }
            }
        }
        await Promise.all([...newOperationData, ...newTravelData, ...newTravelDataIncompleto])
        // filtrar los viajes hacia colquicocha
        const isTest = newTravelData.some(i => i.driver_Id === 1 || i.truck_Id === 1)
        if (isTest) return res.status(200).json({ status: true, message: 'Es un viaje de prueba' })
        const tripsCanchas = newTravelData.filter((i) => i.ruta === 'YUM CANCHA SUPERFICIE - UCH CANCHA COLQUICOCHA' || i.ruta === 'YUM CARGUIO INTERIOR MINA - UCH CANCHA COLQUICOCHA')
        const tripsPlanta = newTravelData.filter(i => i.ruta === 'UCH CANCHA COLQUICOCHA - UCH ECHADERO PLANTA')
        const months = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO','AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE']
        if (tripsCanchas.length > 0) {
            const tripsFormatted = tripsCanchas.map(async (i) => {
                const operation = await OperationTruckModel.findOne(({code: i.code}))
                const truck = await TruckModel.findOne(({truckId: i.truck_Id}))
                const driver = await DriverModel.findOne(({driverId: i.driver_Id}))
                const contract = await ContractModel.findOne(({contractId: driver.contract}))
                const tajo = await TajoModel.findOne({name: i.tajo})
                return {
                    code: i.code,
                    month: months[new Date(i.dataCreatedAt).getMonth()], // ENERO / DIC
                    year: new Date(i.dataCreatedAt).getFullYear(), // 2021
                    date: i.dataCreatedAt,
                    status: 'Cancha',
                    ubication: 'Cancha Colquicocha',
                    turn: operation.turno,
                    mining: i.mining.toUpperCase(),
                    operator: driver.name,
                    tag: truck.tag,
                    contract: contract.name,
                    type: i.type,
                    tajo: i.tajo, // llamar a veta y level
                    zona: tajo.zona,
                    level: tajo.level,
                    veta: tajo.veta,
                    material: i.dominio,
                    ton: i.weight_net * 0.94 / 1000,
                    tonh: i.weight_net / 1000,
                    timestamp: i.timestamp,
                    nro_month: new Date(i.dataCreatedAt).getMonth() + 1, // mes de NODE
                    statusMina: 'Completo',
                    statusTrip: 'waitComplete',
                    history: [{work: 'CREATE viaje nuevo de camion', date: i.timestamp, user: driver.name}],
                    carriage: 'Camion',
                    splitRequired: false
                }
            })
            const data = await Promise.all(tripsFormatted)
            // console.log('TRIPS-CANCHAS', data)
            await axios.post(`${process.env.GEOLOGY_URL}/trip`, data)
        }

        if (tripsPlanta.length > 0) {
            // console.log('TRIPS-PLANTA', tripsPlanta)
            const tripsFormatted = tripsPlanta.map(async (i) => {
                const operation = await OperationTruckModel.findOne(({code: i.code}))
                const truck = await TruckModel.findOne(({truckId: i.truck_Id}))
                const driver = await DriverModel.findOne(({driverId: i.driver_Id}))
                const contract = await ContractModel.findOne(({contractId: driver.contract}))
                // const pila = await axios.get(`${process.env.GEOLOGY_URL}/pilaTableta/${i.tablet}`)
                return {
                    code: i.code,
                    month: months[new Date(i.dataCreatedAt).getMonth()], // ENERO / DIC
                    year: new Date(i.dataCreatedAt).getFullYear(), // 2021
                    date: i.dataCreatedAt, // 01/01/2021
                    turn: operation.turno,
                    operator: driver.name,
                    tag: truck.tag,
                    contract: contract.name,
                    cod_tableta: i.tablet,
                    ton: i.weight_net / 1000 / (1 + 9/100),
                    tonh: i.weight_net / 1000,
                    timestamp: i.timestamp,
                    dateCreatedAt: i.dataCreatedAt,
                    nro_month: new Date(i.dataCreatedAt).getMonth() + 1, // mes de NODE
                    statusMina: 'Completo',
                    validMina: true
                }
            })
            const data = await Promise.all(tripsFormatted)
            // console.log('TRIPS-PLANTA', data)
            await axios.post(`${process.env.GEOLOGY_URL}/planta`, data)
        }
        
        return res.status(200).json({ status: true, message: 'Se ha registrado la data correctamente en la base de datos' })
        
    } catch (error) {
        console.log(error)
        res.json({ message: error.message })
    }
}

// LISTA DE OPERACIONES DE CAMIONES CON SUS RESPECTIVOS VIAJES
export const getListTruck = async (req, res) => {
    try {

        const contracts = await ContractModel.find({}, {contractId: 1, name: 1, _id: 0})

        const operations = await OperationTruckModel.find()
        const travels = await TravelTruckModel.find()

        const drivers = await DriverModel.find({}, {driverId: 1, name: 1, contract: 1, _id: 0})
        const trucks = await TruckModel.find({}, {truckId: 1, tag: 1, contract: 1,_id: 0})

        const data = operations.map((operation) => {
            const travel = travels.filter((travel) => {
                return (
                    travel.operationTruck_Id === operation.operationTruck_Id &&
                    travel.driver_Id === operation.driver_Id &&
                    travel.truck_Id === operation.truck_Id &&
                    travel.mining === operation.mining &&
                    travel.ruta === operation.ruta
                )
            })

            const driver = drivers.find((d) => d.driverId === operation.driver_Id)
            const driverName = driver ? driver.name : "Desconocido"
            const drivercontractNameObj = contracts.find((contract) => contract.contractId === driver.contract)
            const drivercontractName = drivercontractNameObj ? drivercontractNameObj.name : "Desconocido"

            const truck = trucks.find((t) => t.truckId === operation.truck_Id)
            const truckName = truck ? truck.tag : "Desconocido"
            const truckcontractNameObj = contracts.find((contract) => contract.contractId === truck.contract)
            const truckcontractName = truckcontractNameObj ? truckcontractNameObj.name : "Desconocido"

            let color
            if (travel.length === 0) {
                color = 'ROJO'
            } else if (travel.length > 3) {
                color = 'VERDE'
            } else {
                color = 'AMARILLO'
            }

            const viajes = travel.map((t) => ({
                _id: t._id,
                travelTruck_Id: t.travelTruck_Id,
                status: t.status,
                loadStart: new Date(t.loadStart),
                loadEnd: new Date(t.loadEnd),
                downloadStart: new Date(t.downloadStart),
                downloadEnd: new Date(t.downloadEnd),
                createdAt: t.createdAt,
            }))

            return {
                operation: {
                    _id: operation._id,
                    operationTruck_Id: operation.operationTruck_Id,
                    driver: driverName,
                    truck: truckName,
                    contractDriver: drivercontractName,
                    contractTruck: truckcontractName,
                    mining: operation.mining,
                    ruta: operation.ruta,
                    turno: operation.turno,
                    qtyHorometer: operation.qtyHorometer,
                    travels: travel.length,
                    color: color,
                    createdAt: operation.createdAt,
                },
                viajes: viajes,
            }
        })

        return res.status(200).json(data)

    } catch (error) {
        res.json({ message: error.message })
    }
}

// LISTA DE OPERACIONES DE VAGONES CON SUS RESPECTIVOS VIAJES
export const getListWagon = async (req, res) => {
    try {
        const operations = await OperationModel.find()
        const travels = await TravelModel.find({}, { _id: 1, travel_Id: 1, operation_Id: 1, operator_Id: 1, locomotive_Id: 1, mining: 1, status: 1, pique: 1, tourStart: 1, tourEnd: 1, loadStart: 1, loadEnd: 1, downloadStart: 1, downloadEnd: 1,createdAt: 1})

        const operators = await OperatorModel.find({}, { operatorId: 1, name: 1, _id: 0 })
        const locomotives = await LocomotiveModel.find({}, { locomotiveId: 1, tag: 1, _id: 0 })

        const data = operations.map((operation) => {

            const travel = travels.filter((travel) => {

                // const traveldatetimeTZ = moment.utc(travel.createdAt).tz('America/Lima')
                // const operationdatetimeTZ = moment.utc(operation.createdAt).tz('America/Lima')

                const traveldatetimeMina = moment.utc(travel.createdAt).add(5, 'hours').tz('America/Lima')
                const operationdatetimeMina = moment.utc(operation.createdAt).add(5, 'hours').tz('America/Lima')

                const travelDate = traveldatetimeMina.format('DD/MM/YYYY')
                const operationDate = operationdatetimeMina.format('DD/MM/YYYY')

                return (
                    travel.operation_Id === operation.operation_Id &&
                    travel.operator_Id === operation.operator_Id &&
                    travel.locomotive_Id === operation.locomotive_Id &&
                    travel.mining === operation.mining &&
                    travelDate === operationDate
                )
            })

            const operator = operators.find((o) => o.operatorId === operation.operator_Id)
            const operatorName = operator ? operator.name : 'Desconocido'

            const locomotive = locomotives.find((l) => l.locomotiveId === operation.locomotive_Id)
            const locomotiveName = locomotive ? locomotive.tag : 'Desconocido'

            let color
            if (travel.length === 0) {
                color = 'ROJO'
            } else if (travel.length > 3) {
                color = 'VERDE'
            } else {
                color = 'AMARILLO'
            }

            const viajes = travel.map((t) => ({
                _id: t._id,
                travel_Id: t.travel_Id,
                // operation_Id: t.operation_Id,
                // operator_Id: t.operator_Id,
                // locomotive_Id: t.locomotive_Id,
                // mining: t.mining,
                pique: t.pique,
                tourStart: new Date(t.tourStart),
                tourEnd: new Date(t.tourEnd),
                loadStart: new Date(t.loadStart),
                loadEnd: new Date(t.loadEnd),
                downloadStart: new Date(t.downloadStart),
                downloadEnd: new Date(t.downloadEnd),
                createdAt: t.createdAt,
            }))

            return {
                operation: {
                    _id: operation._id,
                    operation_Id: operation.operation_Id,
                    operator: operatorName,
                    locomotive: locomotiveName,
                    mining: operation.mining,
                    turno: operation.turno,
                    qtyHorometer: operation.qtyHorometer,
                    travels: travel.length,
                    color: color,
                    createdAt: operation.createdAt,
                },
                viajes: viajes,
            }
        })
        
        return res.status(200).json(data)
    } catch (error) {
        res.json({ message: error.message })
    }
}

// ACTUALIZAR TARA DEL CAMION
export const getTruckUpdated = async (req, res) => {
    
    try {
        const truckList = req.body

        const trucks = await TruckModel.find({}, { truckId: 1, tara: 1, updatedAt: 1, _id: 0 })
        const truckData = trucks.map((truck) => ({
            truckId: truck.truckId,
            tara: truck.tara,
            updatedAt: truck.updatedAt.getTime()
        }))

        for (const updatedTruck of truckList) {
            const existingTruck = truckData.find((truck) => truck.truckId === updatedTruck.truckId)

            if (existingTruck) {
                if (updatedTruck.updatedAt > existingTruck.updatedAt) {
                    await TruckModel.updateOne({ truckId: updatedTruck.truckId }, { tara: updatedTruck.tara, updatedAt: updatedTruck.updatedAt })
                }
            }
        }

        return res.status(200).json({ status: true, message: 'Actualizacion exitosa' })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}