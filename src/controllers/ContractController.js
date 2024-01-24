// IMPORTAMOS EL MODELO

import ContractModel from '../models/ContractModel.js'

export const getAllContracts = async (req, res) => {
    try {
        const contracts = await ContractModel.find({ contractId: { $ne: 1 } }, { contractId: 1, name: 1, createdAt: 1, _id: 0 });

        return res.status(200).json(contracts);

    } catch (error) {
        res.json({ message: error.message });
    }
}

export const getContract = async (req, res) => {
    try {
        const contract = await ContractModel.findOne({contractId: req.params.contractId});

        if (!contract) {
            return res.status(200).json({status: false, message: 'No existe la contrata'})
        }

        return res.status(200).json(contract);

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createContract = async (req, res) => {
    try {

        const lastContract = await ContractModel.findOne().sort({contractId: -1})

        const newContract = new ContractModel({
            contractId: lastContract.contractId + 1,
            name: req.body.name
        })

        await newContract.save()

        return res.status(200).json({status: true, message: 'Se ha registrado una nueva contrata'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateContract = async (req, res) => {
    try {

        const contractId = req.params.contractId

        const { name } = req.body

        const contract = await ContractModel.findOne({contractId: contractId})

        if (!contract) {
            return res.status(200).json({status: false, message: 'No existe la contrata'})
        }

        await ContractModel.updateOne({contractId: contractId}, {
            name: name
        })

        return res.status(200).json({status: true, message: 'Se ha actualizado la contrata'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteContract = async (req, res) => {
    try {

        const contractId = req.params.contractId

        const contractDeleted = await ContractModel.findOne({contractId: contractId})

        if (!contractDeleted) {
            return res.status(200).json({status: false, message: 'No existe la contrata'})
        }

        await ContractModel.deleteOne({contractId: contractId})

        return res.status(200).json({status: true, message: 'Se ha eliminado la contrata'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}