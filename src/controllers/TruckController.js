// IMPORTAMO EL MODELO

import ContractModel from '../models/ContractModel.js'
import TruckModel from '../models/TruckModel.js'

export const getAllTrucks = async (req, res) => {
    try {
        const contracts = await ContractModel.find({}, { contractId: 1, name: 1, _id: 0 });

        const validFliter = {
            0: 'DESHABILITADO',
            1: 'HABILITADO',
        }

        const trucks = await TruckModel.find({ truckId: { $ne: 1 } }, { truckId: 1, tag: 1, mining: 1, tara: 1, contract: 1, valid: 1, createdAt: 1, updatedAt: 1, _id: 0 });

        const data = trucks.map((truck) => {
            const contractNameObj = contracts.find((contract) => contract.contractId === truck.contract);

            const contractName = contractNameObj ? contractNameObj.name : 'Desconocido';

            const validName = validFliter[truck.valid];

            return {
                ...truck.toObject(),
                contract: contractName,
                valid: validName,
            };
        });

        return res.status(200).json(data);

    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getTruck = async (req, res) => {
    try {
        
        const truck = await TruckModel.findOne({truckId: req.params.truckId})

        if (!truck) {
            return res.status(200).json({status: false, message: 'No existe el camion'})
        }

        return res.status(200).json(truck)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTruck = async (req, res) => {
    try {

        const lastTruck = await TruckModel.findOne().sort({truckId: -1})

        let name = ''

        if (lastTruck.truckId + 1 < 10) {
            name = 'TRUCK #0' + (lastTruck.truckId + 1)
        }
        else {
            name = 'TRUCK #' + (lastTruck.truckId + 1)
        }

        const newTruck = new TruckModel({
            truckId: lastTruck.truckId + 1,
            description: name,
            brand: 'VOLQUETE',
            model: 'VOLVO',
            tag: req.body.tag,
            mining: "Yumpag",
            tara: req.body.tara,
            contract: req.body.contract,
            valid: req.body.valid
        })

        await newTruck.save()

        return res.status(200).json({status: true, message: 'Se ha registrado un nuevo camion'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTruck = async (req, res) => {
    try {

        const truckId = req.params.truckId

        const {description, brand, model, tag, mining, tara, contract, valid} = req.body

        const truck = await TruckModel.findOne({truckId: truckId})
        if (!truck) {
            return res.status(200).json({status: false, message: 'No existe un camion con el mismo ID'})
        }

        await TruckModel.updateOne({truckId: truckId}, {
            description: description,
            brand: brand,
            model: model,
            tag: tag,
            mining: mining,
            tara: tara,
            contract: contract,
            valid: valid,
            updatedAt: new Date()
        })

        return res.status(200).json({status: true, message: 'Se ha actualizado el camion'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTruck = async (req, res) => {
    try {

        const truckId = req.params.truckId

        const truck = await TruckModel.findOne({truckId: truckId})
        if (!truck) {
            return res.status(200).json({status: false, message: 'No existe el camion'})
        }

        await TruckModel.deleteOne({truckId: truckId})

        return res.status(200).json({status: true, message: 'Se ha eliminado el camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}