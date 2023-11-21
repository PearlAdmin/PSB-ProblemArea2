import mongoose, {Schema} from "mongoose";

const logSchema = new Schema({
    recordId: {
        type: String,
        required: true
    },
    editedBy: {
        type: String,
        required: true
    },
    action: {
        type: String,
        enum: ['created', 'edited'],
        default: 'created',
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    }
});

const Log = mongoose.models.Log || mongoose.model('Log', logSchema);

export default Log;