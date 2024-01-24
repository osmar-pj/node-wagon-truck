import mongoose from 'mongoose'

const DriverSchema = new mongoose.Schema({
    driverId: Number,
    name: String,
    cargo: String,
    dni: String,
    mining: String,
    contract: Number,
    valid: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false,
}
)

const DriverModel = mongoose.model('Driver', DriverSchema)

export default DriverModel