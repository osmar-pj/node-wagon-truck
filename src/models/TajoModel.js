import mongoose from 'mongoose'

const TajoSchema = new mongoose.Schema({
    tajoId: Number,
    name: String,
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

const TajoModel = mongoose.model('Tajo', TajoSchema)

export default TajoModel