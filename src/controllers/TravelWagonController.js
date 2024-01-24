// IMPORTAMOS EL MODELO

import TravelModel from '../models/TravelWagonModel.js'

export const getAllTravelWagons = async (req, res) => {
    try {

        const travelsWagons = await TravelModel.find()

        return res.status(200).json(travelsWagons)
        
    } catch (error) {
        res.json({message: error.message})
    }
}


export const getTravelWagon = async (req, res) => {
    try {

        const travelWagon = await TravelModel.findOne({_id: req.params.travel_Id})

        if (!travelWagon) {
            return res.status(200).json({status: false, message: 'El viaje del vagon no existe'})
        }

        return res.status(200).json(travelWagon)
        
    } catch (error) {
        res.json({message: error.message})
    }

}

export const createTravelWagon = async (req, res) => {
    try {

        const {travel_Id, operation_Id, operator_Id, locomotive_Id, mining, status, pique, destino, wagons, wagonsI, wagonsF, activityI, activityF, delayI, delayF, stopI, stopF, tourStart, tourEnd, loadStart, loadEnd, downloadStart, downloadEnd, createdAt} = req.body

        const newTravel = new TravelModel({
            travel_Id: travel_Id,
            operation_Id: operation_Id,
            operator_Id: operator_Id,
            locomotive_Id: locomotive_Id,
            mining: mining,
            status: status,
            pique: pique,
            destino: destino,
            wagons: wagons,
            wagonsI: wagonsI,
            wagonsF: wagonsF,
            activityI: activityI,
            activityF: activityF,
            delayI: delayI,
            delayF: delayF,
            stopI: stopI,
            stopF: stopF,
            tourStart: tourStart,
            tourEnd: tourEnd,
            loadStart: loadStart,
            loadEnd: loadEnd,
            downloadStart: downloadStart,
            downloadEnd: downloadEnd,
            createdAt: createdAt
        })

        await newTravel.save()

        return res.status(200).json({status: true, message: 'Se ha registrado el viaje del vagon correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const updateTravelWagon = async (req, res) => {
    try {
        
        const travel_Id = req.params.travel_Id

        const {operation_Id, operator_Id, locomotive_Id, mining, status, pique, destino, wagons, wagonsI, wagonsF, activityI, activityF, delayI, delayF, stopI, stopF, tourStart, tourEnd, loadStart, loadEnd, downloadStart, downloadEnd, createdAt} = req.body

        const travel = await TravelModel.findOne({_id: travel_Id})

        if (!travel) {
            return res.status(400).json({status: false, message: 'No existe el viaje del vagon que desea actualizar'})
        }

        const updateTravel = await TravelModel.findOneAndUpdate({_id: travel_Id}, {
            // travel_Id: travel_Id,
            operation_Id: operation_Id,
            operator_Id: operator_Id,
            locomotive_Id: locomotive_Id,
            mining: mining,
            status: status,
            pique: pique,
            destino: destino,
            wagons: wagons,
            wagonsI: wagonsI,
            wagonsF: wagonsF,
            activityI: activityI,
            activityF: activityF,
            delayI: delayI,
            delayF: delayF,
            stopI: stopI,
            stopF: stopF,
            tourStart: tourStart,
            tourEnd: tourEnd,
            loadStart: loadStart,
            loadEnd: loadEnd,
            downloadStart: downloadStart,
            downloadEnd: downloadEnd,
            createdAt: createdAt
        })

        await updateTravel.save()

        return res.status(200).json({status: true, message: 'Se ha actualizado el viaje del vagon correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}

export const deleteTravelWagon = async (req, res) => {
    try {
        
        const travel_Id = req.params.travel_Id

        const travel = await TravelModel.findOne({_id: travel_Id})

        if (!travel) {
            return res.status(400).json({status: false, message: 'No existe el viaje del vagon que desea eliminar'})
        }

        await TravelModel.findOneAndDelete({_id: travel_Id})

        return res.status(200).json({status: true, message: 'Se ha eliminado el viaje del vagon correctamente'})

    } catch (error) {
        res.json({message: error.message})
    }
}