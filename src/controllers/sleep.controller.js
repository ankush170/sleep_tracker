import { Sleep } from "../models/sleep.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {asyncHandler} from "../utils/asyncHandler.js"

// Adding a sleep record for a user
export const addSleepRecord = asyncHandler (async (req, res) => {
  try {
    const { userId, duration, timestamp } = req.body;

    // Checking if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(409, "User not found");
    }

    // Creating a new sleep record
    const sleepRecord = await Sleep.create({ user: userId, duration, timestamp });

    // Updating the user's sleepRecord array
    user.sleepRecord.push(sleepRecord._id);
    await user.save();

    res.status(201).json(
        new ApiResponse(
            200,
            sleepRecord,
            "Sleep record created Successfully"
        )
    );
  } catch (error) {
    throw new ApiError(400, "Error is creating sleep record")
  }
});





// Get all sleep records for a user
export const getSleepRecordsByUserId = asyncHandler( async (req, res) => {
  try {
    const userId = req.params.userId;

    // Checking if the user exists
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Populating the sleep records for the user
    await user.populate("sleepRecord").execPopulate();

    res.status(200).json(
        new ApiResponse(
            200,
            user.sleepRecord,
            "Sleep records for user fetched succesfully"
        )
    );
  } catch (error) {
    throw new ApiError(400, "Error fetching sleep records for user")
  }
});




// Delete a sleep record by its ID
export const deleteSleepRecordById = asyncHandler(async (req, res) => {
  try {
    const recordId = req.params.recordId;

    // Checking if the sleep record exists
    const sleepRecord = await Sleep.findById(recordId);
    if (!sleepRecord) {
      throw new ApiError(404, "Sleep record not found");
    }

    // Remove the sleep record from the user's sleepRecord array
    await User.findByIdAndUpdate(sleepRecord.user, {
      $pull: { sleepRecord: recordId },
    });

    // Delete the sleep record
    await sleepRecord.remove();

    return res
    .status(200)
    .json(new ApiResponse(200, "Sleep record deleted successfully"))
  } catch (error) {
    throw new ApiError(400, "Error deleting sleep record")
  }
});
