import mongoose from 'mongoose'

const OperatorSchema = new mongoose.Schema({
    operatorId: Number,
    name: String,
    cargo: String,
    dni: String,
    mining: String
},
{
    versionKey: false,
}
)

const OperatorModel = mongoose.model('Operator', OperatorSchema)

export default OperatorModel