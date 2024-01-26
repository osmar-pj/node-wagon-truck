import mongoose from 'mongoose'

const travelSchema = new mongoose.Schema({
    travel_Id: Number,
    operation_Id: Number,
    operator_Id: Number,
    locomotive_Id: Number,
    mining: String,
    status: String,
    pique: String,
    destino: JSON,
    wagons: JSON,
    wagonsI: JSON,
    wagonsF: JSON,
    activityI: JSON,
    activityF: JSON,
    delayI: JSON,
    delayF: JSON,
    stopI: JSON,
    stopF: JSON,
    tourStart: Number,
    tourEnd: Number,
    loadStart: Number,
    loadEnd: Number,
    downloadStart: Number,
    downloadEnd: Number,
    code: Number,
    dateCreated: Date
},
{
    timestamps: true,
    versionKey: false,
}
)

const TravelModel = mongoose.model('Travel', travelSchema)

export default TravelModel
