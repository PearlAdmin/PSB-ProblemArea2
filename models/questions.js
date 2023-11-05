import mongoose, {Schema} from "mongoose";

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    inputType: {
        type: String,
        enum: ['text', 'radio', 'checkbox', 'file', 'number', 'date', 'header'],
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

const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

export default Question;