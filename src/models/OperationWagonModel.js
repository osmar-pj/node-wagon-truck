import mongoose from 'mongoose';

const operationSchema = new mongoose.Schema({
    operation_Id: Number,
    operator_Id: Number,
    locomotive_Id: Number,
    mining: String,
    status: String,
    turno: String,
    qtyWagons: Number,
    qtyHorometer: Number,
    checklist_verifyL: JSON,
    checklist_conditionsL: JSON,
    checklist_verifyW: JSON,
    checklist_conditionsW: JSON,
    createdAt: Date
},
{
    versionKey: false,
}
)

const OperationModel = mongoose.model('Operation', operationSchema)

export default OperationModel