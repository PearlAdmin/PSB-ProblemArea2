import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        enum: ['text', 'radio', 'checkbox', 'file', 'number', 'date'],
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
    choices: {
        type: [String],
        default: undefined
    }
});

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;