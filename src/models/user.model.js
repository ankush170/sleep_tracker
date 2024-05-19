import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
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