import mongoose from 'mongoose'

const travelTruckSchema = new mongoose.Schema({
    travelTruck_Id: Number,
    operationTruck_Id: Number,
    driver_Id: Number,
    truck_Id: Number,
    mining: String,
    status: String,
    ruta: String,
    tablet: Number,
    type: String,
    tajo: String,
    dominio: String,
    weight_net: Number,
    tara: Number,
    weight_gross: Number,
    stop: JSON,
    stand: JSON,
    delay: JSON,
    maintenance: JSON,
    loadStart: Number,
    loadEnd: Number,
    tour: Number,
    downloadStart: Number,
    downloadEnd: Number,
    dateCreated: Date,
    code: Number
},
{
    timestamps: true,
    versionKey: false,
}
)

const TravelTruckModel = mongoose.model('TruckTravel', travelTruckSchema)

export default TravelTruckModel
