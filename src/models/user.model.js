import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    sleepRecord: [
        {
            type: Schema.Types.ObjectId,
            ref: "Sleep"
        }
    ],
},{
    timestamps : true
})

export const User = mongoose.model("User", userSchema)