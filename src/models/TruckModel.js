import mongoose from 'mongoose'

const TruckSchema = new mongoose.Schema({
    truckId: Number,
    description: String,
    brand: String,
    model: String,
    tag: String,
    mining: String,
    tara: Number,
    contract: Number,
    valid: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false,
}
)

const TruckModel = mongoose.model('Truck', TruckSchema)

export default TruckModel