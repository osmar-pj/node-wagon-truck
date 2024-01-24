import mongoose from 'mongoose'

const contractSchema = new mongoose.Schema({
    contractId: Number,
    name: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    versionKey: false,
}
)

const ContractModel = mongoose.model('Contract', contractSchema)

export default ContractModel