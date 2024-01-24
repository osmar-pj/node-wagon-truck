// IMPORTAMOS EL MODELO

import TajoModel from '../models/TajoModel.js'

export const getAllTajos = async (req, res) => {
    try {

        const validFliter = {
            0: 'DESHABILITADO',
            1: 'HABILITADO',
        }

        const tajos = await TajoModel.find({}, { tajoId: 1, name: 1, valid: 1, createdAt: 1, _id: 0 });

        const data = tajos.map((tajo) => {
            const validName = validFliter[tajo.valid];
            
            return {
                ...tajo.toObject(),
                valid: validName,
            };
        });

        return res.status(200).json(data);

    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTajo = async (req, res) => {
    try {
        const tajo = await TajoModel.findOne({tajoId: req.params.tajoId});

        if (!tajo) {
            return res.status(200).json({status: false, message: 'No existe el tajo'})
        }

        return res.status(200).json(tajo);

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTajo = async (req, res) => {
    try {

        const lastTajo = await TajoModel.findOne().sort({tajoId: -1})

        const newTajo = new TajoModel({
            tajoId: lastTajo.tajoId + 1,
            name: req.body.name,
            valid: req.body.valid
        })

        await newTajo.save()

        return res.status(200).json({status: true, message: 'Tajo creado correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTajo = async (req, res) => {
    try {

        const tajoId = req.params.tajoId

        const { name, valid } = req.body

        const tajo = await TajoModel.findOne({tajoId: tajoId})

        if (!tajo) {
            return res.status(200).json({status: false, message: 'No existe el tajo'})
        }

        await TajoModel.updateOne({tajoId: tajoId}, {
            name: name,
            valid: valid
        })

        return res.status(200).json({status: true, message: 'Tajo actualizado correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTajo = async (req, res) => {
    try {

        const tajoId = req.params.tajoId

        const tajoDeleted = await TajoModel.findOne({tajoId: tajoId})

        if (!tajoDeleted) {
            return res.status(200).json({status: false, message: 'No existe el tajo'})
        }

        await TajoModel.deleteOne({tajoId: tajoId})

        return res.status(200).json({status: true, message: 'Tajo eliminado correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}