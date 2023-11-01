import mongoose, { Schema } from "mongoose";

const noStrictSchema = new Schema({}, {strict: false});

const Record = mongoose.models.Record || mongoose.model('Record', noStrictSchema, 'records');

export default Record;