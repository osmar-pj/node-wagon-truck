// IMPORTAMOS EL MODELO

import LocomotiveModel from '../models/LocomotiveModel.js'

export const getAllLocomotives = async (req, res) => {
    try {

        const locomotives = await LocomotiveModel.find()

        return res.status(200).json(locomotives)
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const getLocomotive = async (req, res) => {
    try {

        const locomotive = await LocomotiveModel.findOne({locomotiveId: req.params.locomotiveId})

        if (!locomotive) {
            return res.status(200).json({status: false, message: 'No existe la locomotora'})
        }

        return res.status(200).json(locomotive)
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createLocomotive = async (req, res) => {
    try {
        
        const { locomotiveId, description, brand, model, tag } = req.body

        const existLocomotive = await LocomotiveModel.findOne({locomotiveId: locomotiveId})
        if (existLocomotive) {
            return res.status(200).json({status: false, message: 'Ya existe otra locomotora con el mismo ID'})
        }

        const newLocomotive = new LocomotiveModel({
            locomotiveId: locomotiveId,
            description: description,
            brand: brand,
            model: model,
            tag: tag
        })

        await newLocomotive.save()

        return res.status(200).json({status: true, message: 'Se ha registrado una nueva locomotora'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateLocomotive = async (req, res) => {
    try {

        const locomotiveId = req.params.locomotiveId

        const {description, brand, model, tag} = req.body

        const locomotive = await LocomotiveModel.findOne({locomotiveId: locomotiveId})

        if (!locomotive) {
            return res.status(200).json({status: false, message: 'No existe una locomotora con el mismo ID'})
        }

        await LocomotiveModel.updateOne({locomotiveId: locomotiveId}, {
            description: description,
            brand: brand,
            model: model,
            tag: tag
        })

        return res.status(200).json({status: true, message: 'Se ha actualizado la locomotora correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteLocomotive = async (req, res) => {
    try {

        const locomotiveId = req.params.locomotiveId

        const locomotive = await LocomotiveModel.findOne({locomotiveId: locomotiveId})

        if (!locomotive) {
            return res.status(200).json({status: false, message: 'No existe la locomotora'})
        }

        await LocomotiveModel.deleteOne({locomotiveId: locomotiveId})

        return res.status(200).json({status: true, message: 'Se ha eliminado la locomotora correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}