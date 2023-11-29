import mongoose, {Schema} from "mongoose";

/**
 * Mongoose schema for representing a form question.
 * @module model/logs
 * @typedef {Object} Edit
 * @property {string} editedBy - indicates the user who edited the record
 * @property {string} action - action taken by the user, it can be either 'created' or 'edited'
 * @property {number} timestamp - indicates the time when the action was taken
 */

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

/**
 * Mongoose schema for representing a form question.
 * @typedef {Object} Log
 * @property {string} recordId - indicates the user who edited the record
 * @property {Edit} edits - contains the information about the edits made to the records
 * @property {boolean} isdeleted - indicates whether the record is deleted
 */

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