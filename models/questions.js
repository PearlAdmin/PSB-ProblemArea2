import mongoose, {Schema} from "mongoose";

/**
 * Mongoose schema for representing a form question.
 * @module models/questions
 * @typedef {Object} Question
 * @property {number} version - indicates the version number of the questions
 * @property {string} question - The question being asked.
 * @property {string} inputType - The type of input for the question. The input could be 
 *                                'text', 'alphanumeric', 'number', 'radio', 'checkbox', 'file', 'date', or 'header'.
 * @property {number} number - A unique number identifier for the question, used in ordering the questions. 
 * @property {boolean} deletable - Indicates whether the question is deletable. Defaults to true.
 * @property {boolean} required - Indicates whether the question is required. Defaults to false.
 * @property {string[]} choices - An array of choices for the question. Applicable only for 'radio' and 'checkbox' input types.
 */

const questionSchema = new Schema({
    version: {
        type: Number, 
        default: 1
    },
    question: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        enum: ['text', 'alphanumeric', 'number', 'radio', 'checkbox', 'file', 'date', 'header'],
        default: 'text'
    },
    number: {
        type: Number,
        required: true,
        unique: true
    },
    deletable: {
        type: Boolean,
        required: true,
        default: true
    },
    required: {
        type: Boolean,
        required: true,
        default: false
    },
    choices: {
        type: [String],
        default: undefined
    }
});

/**
 * Mongoose model representing a survey question.
 * @type {mongoose.Model<Question>}
 */
const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;