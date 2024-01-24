// IMPORTAMOS TODOS LOS MODELOS

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

// ENVIAMOS DRIVERS, TRUCKS Y TAJOS
export const getAllDriversTrucks = async (req, res) => {
    try {
        
        const drivers = await DriverModel.find({}, {driverId: 1, name: 1, contract: 1, valid: 1, _id: 0})

        const trucks = await TruckModel.find({}, {truckId: 1, tag: 1, tara: 1, contract: 1, valid: 1, updatedAt: 1, _id: 0})

        const tajos = await TajoModel.find({}, {tajoId: 1, name: 1, valid: 1, _id: 0})

        const truckData = trucks.map((truck) => ({
            truckId: truck.truckId,
            tag: truck.tag,
            tara: truck.tara,
            contract: truck.contract,
            valid: truck.valid,
            updatedAt: truck.updatedAt.getTime()
        }));

        return res.status(200).json({drivers: drivers, trucks: truckData, tajos: tajos})

    } catch (error) {
        res.json({message: error.message})
    }
}

// REGISTRO DE DATA DE VAGONES
export const insertWagonData = async (req, res) => {
    try {
        const fulldata = req.body;
        
        const insertData = async (Model, data) => {
            const newDataTagers = new Model(data);
            await newDataTagers.save();
            return newDataTagers;
        };

        const dataOperations = fulldata.dataOperation;
        const newOperationData = [];

        for (const operationData of dataOperations) {
            const newOperation = await insertData(OperationModel, operationData);
            newOperationData.push(newOperation);
        }

        const dataTravels = fulldata.dataTravel;
        const newTravelData = [];

        for (const travelData of dataTravels) {
            const newTravel = await insertData(TravelModel, travelData);
            newTravelData.push(newTravel);
        }

        const dataTravelsIncompleto = fulldata.dataTravelIncompleto;
        const newTravelDataIncompleto = [];

        if (dataTravelsIncompleto && dataTravelsIncompleto.length > 0) {
            for (const travelDataIncompleto of dataTravelsIncompleto) {
                const newTravelIncompleto = await insertData(TravelModel, travelDataIncompleto);
                newTravelDataIncompleto.push(newTravelIncompleto);
            }
        }

        await Promise.all([...newOperationData, ...newTravelData, ...newTravelDataIncompleto]);

        return res.status(200).json({ status: true, message: 'Se ha registrado la data correctamente en la base de datos' });
    } catch (error) {
        res.json({ message: error.message });
    }
}

// REGISTRO DE DATA DE CAMIONES
export const insertTruckData = async (req, res) => {
    try {
        const truckdata = req.body;

        const insertData = async (Model, data) => {
            const newDataTagers = new Model(data);
            await newDataTagers.save();
            return newDataTagers;
        };

        const drivers = await DriverModel.find({ valid: { $in: [1, 2] } }, { driverId: 1, _id: 0 });
        const validDriverIds = drivers.map(driver => driver.driverId);

        const trucks = await TruckModel.find({ valid: { $in: [1, 2] } }, { truckId: 1, _id: 0 });
        const validTruckIds = trucks.map(truck => truck.truckId);

        const dataOperations = truckdata.dataOperation;
        const newOperationData = [];

        for (const operationData of dataOperations) {
            if (validDriverIds.includes(operationData.driver_Id) && validTruckIds.includes(operationData.truck_Id)) {
                const newOperation = await insertData(OperationTruckModel, operationData);
                newOperationData.push(newOperation);
            }
        }

        const dataTravels = truckdata.dataTravel;
        const newTravelData = [];

        for (const travelData of dataTravels) {
            if (validDriverIds.includes(travelData.driver_Id) && validTruckIds.includes(travelData.truck_Id)) {
                const newTravel = await insertData(TravelTruckModel, travelData);
                newTravelData.push(newTravel);
            }
        }

        const dataTravelsIncompleto = truckdata.dataTravelIncompleto;
        const newTravelDataIncompleto = [];

        if (dataTravelsIncompleto && dataTravelsIncompleto.length > 0) {
            for (const travelDataIncompleto of dataTravelsIncompleto) {
                if (validDriverIds.includes(travelDataIncompleto.driver_Id) && validTruckIds.includes(travelDataIncompleto.truck_Id)) {
                    const newTravelIncompleto = await insertData(TravelTruckModel, travelDataIncompleto);
                    newTravelDataIncompleto.push(newTravelIncompleto);
                }
            }
        }

        await Promise.all([...newOperationData, ...newTravelData, ...newTravelDataIncompleto]);

        return res.status(200).json({ status: true, message: 'Se ha registrado la data correctamente en la base de datos' });
        
    } catch (error) {
        console.log(error);
        res.json({ message: error.message });
    }
};

// LISTA DE OPERACIONES DE CAMIONES CON SUS RESPECTIVOS VIAJES
export const getListTruck = async (req, res) => {
    try {

        const contracts = await ContractModel.find({}, {contractId: 1, name: 1, _id: 0})

        const operations = await OperationTruckModel.find();
        const travels = await TravelTruckModel.find();

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
                );
            });

            const driver = drivers.find((d) => d.driverId === operation.driver_Id);
            const driverName = driver ? driver.name : "Desconocido";
            const drivercontractNameObj = contracts.find((contract) => contract.contractId === driver.contract);
            const drivercontractName = drivercontractNameObj ? drivercontractNameObj.name : "Desconocido";

            const truck = trucks.find((t) => t.truckId === operation.truck_Id);
            const truckName = truck ? truck.tag : "Desconocido";
            const truckcontractNameObj = contracts.find((contract) => contract.contractId === truck.contract);
            const truckcontractName = truckcontractNameObj ? truckcontractNameObj.name : "Desconocido";

            let color;
            if (travel.length === 0) {
                color = 'ROJO';
            } else if (travel.length > 3) {
                color = 'VERDE';
            } else {
                color = 'AMARILLO';
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
            }));

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
            };
        });

        return res.status(200).json(data);

    } catch (error) {
        res.json({ message: error.message });
    }
}

// LISTA DE OPERACIONES DE VAGONES CON SUS RESPECTIVOS VIAJES
export const getListWagon = async (req, res) => {
    try {
        const operations = await OperationModel.find();
        const travels = await TravelModel.find({}, { _id: 1, travel_Id: 1, operation_Id: 1, operator_Id: 1, locomotive_Id: 1, mining: 1, status: 1, pique: 1, tourStart: 1, tourEnd: 1, loadStart: 1, loadEnd: 1, downloadStart: 1, downloadEnd: 1,createdAt: 1});

        const operators = await OperatorModel.find({}, { operatorId: 1, name: 1, _id: 0 });
        const locomotives = await LocomotiveModel.find({}, { locomotiveId: 1, tag: 1, _id: 0 });

        const data = operations.map((operation) => {

            const travel = travels.filter((travel) => {

                // const traveldatetimeTZ = moment.utc(travel.createdAt).tz('America/Lima');
                // const operationdatetimeTZ = moment.utc(operation.createdAt).tz('America/Lima');

                const traveldatetimeMina = moment.utc(travel.createdAt).add(5, 'hours').tz('America/Lima');
                const operationdatetimeMina = moment.utc(operation.createdAt).add(5, 'hours').tz('America/Lima');

                const travelDate = traveldatetimeMina.format('DD/MM/YYYY');
                const operationDate = operationdatetimeMina.format('DD/MM/YYYY');

                return (
                    travel.operation_Id === operation.operation_Id &&
                    travel.operator_Id === operation.operator_Id &&
                    travel.locomotive_Id === operation.locomotive_Id &&
                    travel.mining === operation.mining &&
                    travelDate === operationDate
                );
            });

            const operator = operators.find((o) => o.operatorId === operation.operator_Id);
            const operatorName = operator ? operator.name : 'Desconocido';

            const locomotive = locomotives.find((l) => l.locomotiveId === operation.locomotive_Id);
            const locomotiveName = locomotive ? locomotive.tag : 'Desconocido';

            let color;
            if (travel.length === 0) {
                color = 'ROJO';
            } else if (travel.length > 3) {
                color = 'VERDE';
            } else {
                color = 'AMARILLO';
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
            }));

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
            };
        });
        
        return res.status(200).json(data);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// ACTUALIZAR TARA DEL CAMION
export const getTruckUpdated = async (req, res) => {
    
    try {
        const truckList = req.body;

        const trucks = await TruckModel.find({}, { truckId: 1, tara: 1, updatedAt: 1, _id: 0 });
        const truckData = trucks.map((truck) => ({
            truckId: truck.truckId,
            tara: truck.tara,
            updatedAt: truck.updatedAt.getTime()
        }));

        for (const updatedTruck of truckList) {
            const existingTruck = truckData.find((truck) => truck.truckId === updatedTruck.truckId);

            if (existingTruck) {
                if (updatedTruck.updatedAt > existingTruck.updatedAt) {
                    await TruckModel.updateOne({ truckId: updatedTruck.truckId }, { tara: updatedTruck.tara, updatedAt: updatedTruck.updatedAt });
                }
            }
        }

        return res.status(200).json({ status: true, message: 'Actualizacion exitosa' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}