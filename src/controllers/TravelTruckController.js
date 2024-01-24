// IMPORTAMOS EL MODELO

import TravelTruckModel from '../models/TravelTruckModel.js'

export const getAllTravelsTrucks = async (req, res) => {
    try {
        
        const travelsTrucks = await TravelTruckModel.find()

        console.log(travelsTrucks.length)

        return res.status(200).json(travelsTrucks.length)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const getTravelTruck = async (req, res) => {
    try {
        
        const travelTruck = await TravelTruckModel.findOne({_id: req.params.travelTruck_Id})

        if (!travelTruck) {
            return res.status(200).json({status: false, message: 'El viaje del camion no existe'})
        }

        return res.status(200).json(travelTruck)

    } catch (error) {
        res.json({message: error.message})
    }
}

export const createTravelTruck = async (req, res) => {
    try {

        const {travelTruck_Id, operationTruck_Id, driver_Id, truck_Id, mining, status, ruta, tablet, type, tajo, dominio, weight_net, tara, weight_gross, stop, stand, delay, maintenance, loadStart, loadEnd, tour, downloadStart, downloadEnd, createdAt} = req.body

        const newTravelTruck = new TravelTruckModel({
            travelTruck_Id: travelTruck_Id,
            operationTruck_Id: operationTruck_Id,
            driver_Id: driver_Id,
            truck_Id: truck_Id,
            mining: mining,
            status: status,
            ruta: ruta,
            tablet: tablet,
            type: type,
            tajo: tajo,
            dominio: dominio,
            weight_net: weight_net,
            tara: tara,
            weight_gross: weight_gross,
            stop: stop,
            stand: stand,
            delay: delay,
            maintenance: maintenance,
            loadStart: loadStart,
            loadEnd: loadEnd,
            tour: tour,
            downloadStart: downloadStart,
            downloadEnd: downloadEnd,
            createdAt: createdAt
        })

        await newTravelTruck.save()

        return res.status(200).json({status: true, message: 'Se ha creado el viaje del camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTravelTruck = async (req, res) => {
    try {

        const travelTruck_Id = req.params.travelTruck_Id

        const {operationTruck_Id, driver_Id, truck_Id, mining, ruta, tablet, type, tajo, dominio, weight_net, tara, weight_gross, stop, stand, delay, maintenance, loadStart, loadEnd, tour, downloadStart, downloadEnd, createdAt} = req.body

        const travel = await TravelTruckModel.findOne({_id: travelTruck_Id})

        if (!travel) {
            return res.status(200).json({status: false, message: 'No existe el viaje del camion que desea actualizar'})
        }

        const updateTravelTruck = await TravelTruckModel.findOneAndUpdate({_id: travelTruck_Id}, {
            // travelTruck_Id: travelTruck_Id,
            operationTruck_Id: operationTruck_Id,
            driver_Id: driver_Id,
            truck_Id: truck_Id,
            mining: mining,
            ruta: ruta,
            tablet: tablet,
            type: type,
            tajo: tajo,
            dominio: dominio,
            weight_net: weight_net,
            tara: tara,
            weight_gross: weight_gross,
            stop: stop,
            stand: stand,
            delay: delay,
            maintenance: maintenance,
            loadStart: loadStart,
            loadEnd: loadEnd,
            tour: tour,
            downloadStart: downloadStart,
            downloadEnd: downloadEnd,
            createdAt: createdAt
        })

        await updateTravelTruck.save()

        return res.status(200).json({status: true, message: 'Se ha actualizado el viaje del camion correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTravelTruck = async (req, res) => {
    try {
        
        const travelTruck_Id = req.params.travelTruck_Id

        const travel = await TravelTruckModel.findOne({_id: travelTruck_Id})

        if (!travel) {
            return res.status(200).json({status: false, message: 'No existe el viaje del camion que desea eliminar'})
        }

        await TravelTruckModel.findOneAndDelete({_id: travelTruck_Id})

        return res.status(200).json({status: true, message: 'Se ha eliminado el viaje del camion correctamente'})
        
    } catch (error) {
        res.json({message: error.message})
    }
}