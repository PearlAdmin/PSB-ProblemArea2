import mongoose, { Schema } from "mongoose";

/**
 * Mongoose schema with no strict structure for representing a sponsored child record.
 * @typedef {Object} NoStrictRecord
 * @property {*} - This schema has no strict structure and allows any properties.
 */

const noStrictSchema = new Schema({}, {strict: false});

/**
 * Mongoose model representing a sponsored record with no strict structure.
 * @type {mongoose.Model<NoStrictRecord>}
 */
const Record = mongoose.models.Record || mongoose.model('Record', noStrictSchema, 'records');

export default Record;