import mongoose, {Schema} from "mongoose";

const sleepSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    duration: {
        type: Number,
        required: true
    }
},{
    timestamps : true
})

export const Sleep = mongoose.model("Sleep", sleepSchema)