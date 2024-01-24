// IMPORTAMOS EL MODELO

import OperationModel from '../models/OperationWagonModel.js'

export const getAllOperationsWagons = async (req, res) => {
    try {
        
        const operationsWagons = await OperationModel.find()

        return res.status(200).json(operationsWagons)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const getOperationWagon = async (req, res) => {
    try {

        const operationWagon = await OperationModel.findOne({_id: req.params.operation_Id})

        if (!operationWagon) {
            return res.status(200).json({status: false, message: 'La operacion del vagon no existe'})
        }

        return res.status(200).json(operationWagon)
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createOperationWagon = async (req, res) => {
    try {

        const {operation_Id, operator_Id, locomotive_Id, mining, status, turno, qtyWagons, qtyHorometer, checklist_verifyL, checklist_conditionsL, checklist_verifyW, checklist_conditionsW, createdAt} = req.body

        const newOperation = new OperationModel({
            operation_Id: operation_Id,
            operator_Id: operator_Id,
            locomotive_Id: locomotive_Id,
            mining: mining,
            status: status,
            turno: turno,
            qtyWagons: qtyWagons,
            qtyHorometer: qtyHorometer,
            checklist_verifyL: checklist_verifyL,
            checklist_conditionsL: checklist_conditionsL,
            checklist_verifyW: checklist_verifyW,
            checklist_conditionsW: checklist_conditionsW,
            createdAt: createdAt
        })

        await newOperation.save()

        return res.status(200).json({status: true, message: 'Se ha registrado la operacion del vagon correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}


export const updateOperationWagon = async (req, res) => {
    try {

        const operation_Id = req.params.operation_Id

        const { operator_Id, locomotive_Id, mining, status, turno, qtyWagons, qtyHorometer, checklist_verifyL, checklist_conditionsL, checklist_verifyW, checklist_conditionsW, createdAt } = req.body

        const operation = await OperationModel.findOne({_id: operation_Id})

        if (!operation) {
            return res.status(404).json({status: false, message: 'No existe la operacion del vagon que desea actualizar'})
        }

        const updateOperation = await OperationModel.findOneAndUpdate({_id: operation_Id}, {
            // operation_Id: operation_Id,
            operator_Id: operator_Id,
            locomotive_Id: locomotive_Id,
            mining: mining,
            status: status,
            turno: turno,
            qtyWagons: qtyWagons,
            qtyHorometer: qtyHorometer,
            checklist_verifyL: checklist_verifyL,
            checklist_conditionsL: checklist_conditionsL,
            checklist_verifyW: checklist_verifyW,
            checklist_conditionsW: checklist_conditionsW,
            createdAt: createdAt
        })

        await updateOperation.save()

        return res.status(200).json({status: true, message: 'Se ha actualizado la  operacion del vagon correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteOperationWagon = async (req, res) => {
    try {

        const operation_Id = req.params.operation_Id

        const operation = await OperationModel.findOne({_id: operation_Id})

        if (!operation) {
            return res.status(404).json({status: false, message: 'No existe la operacion del vagon que desea eliminar'})
        }

        await OperationModel.findOneAndDelete({_id: operation_Id})

        return res.status(200).json({status: true, message: 'Se ha eliminado la operacion del vagon correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}