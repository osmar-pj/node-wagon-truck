import mongoose from 'mongoose'

const TajoSchema = new mongoose.Schema({
    tajoId: Number,
    name: String,
    valid: Number,
    zona: String,
    level: String,
    veta: String,
    mineral: String,
},
{
    timestamps: true,
    versionKey: false,
}
)

const TajoModel = mongoose.model('Tajo', TajoSchema)

export default TajoModel