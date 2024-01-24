// IMPORTAMOS EL MODELO

import ContractModel from '../models/ContractModel.js';
import DriverModel from '../models/DriverModel.js'

export const getAllDrivers = async (req, res) => {
    try {
        const contracts = await ContractModel.find({}, { contractId: 1, name: 1, _id: 0 });

        const validFliter = {
            0: 'DESHABILITADO',
            1: 'HABILITADO',
        }

        const drivers = await DriverModel.find({ driverId: { $ne: 1 } }, { driverId: 1, name: 1, mining: 1, contract: 1, valid: 1, createdAt: 1, _id: 0 });

        const data = drivers.map((driver) => {
            const contractNameObj = contracts.find((contract) => contract.contractId === driver.contract);

            const contractName = contractNameObj ? contractNameObj.name : 'Desconocido';

            const validName = validFliter[driver.valid];

            return {
                ...driver.toObject(),
                contract: contractName,
                valid: validName,
            };
        });

        return res.status(200).json(data);

    } catch (error) {
        res.json({ message: error.message });
    }
};

export const getDriver = async (req, res) => {
    try {

        const driver = await DriverModel.findOne({driverId: req.params.driverId})

        if (!driver) {
            return res.status(200).json({status: false, message: 'No existe el conductor'})
        }

        return res.status(200).json(driver)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createDriver = async (req, res) => {
    try {

        const lastDriver = await DriverModel.findOne().sort({driverId: -1})

        const name = req.body.name.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }).join(' ')

        const newDriver = new DriverModel({
            driverId: lastDriver.driverId + 1,
            name: name,
            dni: req.body.dni,
            mining: "Yumpag",
            contract: req.body.contract,
            valid: req.body.valid
        })

        await newDriver.save()

        return res.status(200).json({status: true, message: 'Se ha registrado un nuevo conductor'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateDriver = async (req, res) => {
    try {

        const driverId = req.params.driverId

        const {name, dni, contract, valid} = req.body

        const driver = await DriverModel.findOne({driverId: driverId})
        if (!driver) {
            return res.status(200).json({status: false, message: 'No existe un conductor con el mismo ID'})
        }

        await DriverModel.updateOne({driverId: driverId}, {
            name: name,
            dni: dni,
            contract: contract,
            valid: valid
        })

        return res.status(200).json({status: true, message: 'Se ha actualizado el conductor'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteDriver = async (req, res) => {
    try {

        const driverId = req.params.driverId

        const driverDeleted = await DriverModel.findOne({driverId: driverId})

        if (!driverDeleted) {
            return res.status(200).json({status: false, message: 'No existe el conductor'})
        }

        await DriverModel.deleteOne({driverId: driverId})

        return res.status(200).json({status: true, message: 'Se ha eliminado el conductor'})

    } catch (error) {
        res.json({message: error.message})
    }
}