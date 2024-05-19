import mongoose, {Schema} from "mongoose";

const sleepSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    duration: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
},{
    timestamps : true
})

export const Sleep = mongoose.model("Sleep", sleepSchema)