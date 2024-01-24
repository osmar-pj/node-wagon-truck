import mongoose from 'mongoose'

const LocomotiveSchema = new mongoose.Schema({
    locomotiveId: Number,
    description: String,
    brand: String,
    model: String,
    tag: String,
    mining: String
},
{
    versionKey: false,
}
)

const LocomotiveModel = mongoose.model('Locomotive', LocomotiveSchema)

export default LocomotiveModel