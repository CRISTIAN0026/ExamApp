import { Schema, model } from 'mongoose';

const examSchema = new Schema({
      text: String,
      options: [String],
      correctOptionIndex: Number,
});

export default model('Exam', examSchema);
