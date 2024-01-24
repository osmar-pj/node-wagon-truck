// IMPORTAMOS EL MODELO

import OperatorModel from '../models/OperatorModel.js'

export const getAllOperators = async (req, res) => {
    try {
        
        const operators = await OperatorModel.find()

        return res.status(200).json(operators)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const getOperator = async (req, res) => {
    try {
        
        const operator = await OperatorModel.findOne({operatorId: req.params.operatorId})

        if (!operator) {
            return res.status(200).json({status: false, message: 'No existe el operador'})
        }

        return res.status(200).json(operator)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createOperator = async (req, res) => {
    try {

        const { operatorId, name, cargo, dni, mining } = req.body

        const existOperator = await OperatorModel.findOne({operatorId: operatorId})
        if (existOperator) {
            return res.status(200).json({status: false, message: 'Ya existe otro operador con el mismo ID'})
        }

        const newOperator = new OperatorModel({
            operatorId: operatorId,
            name: name,
            cargo: cargo,
            dni: dni,
            mining: mining
        })

        await newOperator.save()

        return res.status(200).json({status: true, message: 'Se ha registrado un nuevo operador'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateOperator = async (req, res) => {
    try {

        const operatorId = req.params.operatorId

        const { name, cargo, dni, mining } = req.body

        const operator = await OperatorModel.findOne({operatorId: operatorId})

        if (!operator) {
            return res.status(200).json({status: false, message: 'El operador no existe'})
        }

        const updateOperator = await OperatorModel.findOneAndUpdate({operatorId: operatorId}, {
            name: name,
            cargo: cargo,
            dni: dni,
            mining: mining
        })

        await updateOperator.save()

        return res.status(200).json({status: true, message: 'Se ha actualizado el operador correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteOperator = async (req, res) => {
    try {

        const operatorId = req.params.operatorId

        const operator = await OperatorModel.findOne({operatorId: operatorId})

        if (!operator) {
            return res.status(200).json({status: false, message: 'El operador no existe'})
        }

        await OperatorModel.deleteOne({operatorId: operatorId})

        return res.status(200).json({status: true, message: 'Se ha eliminado el operador correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}