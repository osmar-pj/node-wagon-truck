import mongoose from 'mongoose'

const operationTruckSchema = new mongoose.Schema({
    operationTruck_Id: Number,
    driver_Id: Number,
    truck_Id: Number,
    mining: String,
    status: String,
    ruta: String,
    turno: String,
    qtyHorometer: Number,
    createdAt: Date,
},
{
    versionKey: false,
}
)

const OperationTruckModel = mongoose.model('TruckOperation', operationTruckSchema)

export default OperationTruckModel