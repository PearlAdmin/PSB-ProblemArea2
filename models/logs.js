import mongoose, {Schema} from "mongoose";

const editSchema = new Schema({
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

const logSchema = new Schema({
    recordId: {
        type: String,
        required: true
    },
    edits: {
        type: [editSchema],
        required: true
    },
    isdeleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

const Log = mongoose.models.Log || mongoose.model('Log', logSchema);

export default Log;