// IMPORTAMOS EL MODELO

import OperationTruckModel from '../models/OperationTruckModel.js'

export const getAllOperationsTrucks = async (req, res) => {
    try {
        
        const operationsTrucks = await OperationTruckModel.find()

        console.log(operationsTrucks.length)

        return res.status(200).json(operationsTrucks)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const getOperationTruck = async (req, res) => {
    try {

        const operationTruck = await OperationTruckModel.findOne({_id: req.params.operationTruck_Id})

        if (!operationTruck) {
            return res.status(200).json({status: false, message: 'La operacion del camion no existe'})
        }

        return res.status(200).json(operationTruck)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createOperationTruck = async (req, res) => {
    try {

        const {operationTruck_Id, driver_Id, truck_Id, mining, status, ruta, turno, qtyHorometer, createdAt} = req.body

        const newOperationTruck = new OperationTruckModel({
            operationTruck_Id: operationTruck_Id,
            driver_Id: driver_Id,
            truck_Id: truck_Id,
            mining: mining,
            status: status,
            ruta: ruta,
            turno: turno,
            qtyHorometer: qtyHorometer,
            createdAt: createdAt
        })

        await newOperationTruck.save()

        return res.status(200).json({status: true, message: 'Se ha creado la operacion del camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateOperationTruck = async (req, res) => {
    try {

        const operationTruck_Id = req.params.operationTruck_Id

        const {driver_Id, truck_Id, mining, ruta, turno, qtyHorometer, createdAt} = req.body

        const operation = await OperationTruckModel.findOne({_id: operationTruck_Id})

        if (!operation) {
            return res.status(200).json({status: false, message: 'No existe la operacion del camion que desea actualizar'})
        }

        const updateOperationTruck = await OperationTruckModel.findOneAndUpdate({_id: operationTruck_Id}, {
            // operationTruck_Id: operationTruck_Id,
            driver_Id: driver_Id,
            truck_Id: truck_Id,
            mining: mining,
            ruta: ruta,
            turno: turno,
            qtyHorometer: qtyHorometer,
            createdAt: createdAt
        })

        await updateOperationTruck.save()

        return res.status(200).json({status: true, message: 'Se ha actualizado la operacion del camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteOperationTruck = async (req, res) => {
    try {

        const operationTruck_Id = req.params.operationTruck_Id

        const operation = await OperationTruckModel.findOne({_id: operationTruck_Id})

        if (!operation) {
            return res.status(200).json({status: false, message: 'No existe la operacion del camion que desea eliminar'})
        }

        await OperationTruckModel.findOneAndDelete({_id: operationTruck_Id})

        return res.status(200).json({status: true, message: 'Se ha eliminado la operacion del camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}