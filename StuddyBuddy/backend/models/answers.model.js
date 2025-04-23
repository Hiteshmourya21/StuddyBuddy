import mongoose from "mongoose";



const AnswerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    text: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    reactions:[
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            type: { type: String, required: true, enum: ['helpful', 'notHelpful'] },
        }
    ]
});

export default mongoose.model('Answer', AnswerSchema);
